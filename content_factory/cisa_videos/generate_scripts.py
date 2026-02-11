#!/usr/bin/env python3
"""
Generate video scripts for CISA topics using Gemini AI.
"""
import os
import json
import requests
from pathlib import Path
from config import (
    GEMINI_API_KEY, 
    SCRIPTS_DIR, 
    SCRIPT_PROMPT_TEMPLATE,
    CISA_DOMAINS
)

GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

def get_domain_for_topic(topic):
    """Determine which CISA domain a topic belongs to."""
    # Simple heuristic based on topic keywords
    topic_lower = topic.lower()
    
    if any(k in topic_lower for k in ['audit', 'sampling', 'evidence', 'planning', 'risk assessment']):
        return 'CISA1', CISA_DOMAINS['CISA1']['name']
    elif any(k in topic_lower for k in ['governance', 'strategy', 'policy', 'management', 'cobit']):
        return 'CISA2', CISA_DOMAINS['CISA2']['name']
    elif any(k in topic_lower for k in ['sdlc', 'development', 'acquisition', 'project', 'testing', 'application']):
        return 'CISA3', CISA_DOMAINS['CISA3']['name']
    elif any(k in topic_lower for k in ['operations', 'change', 'disaster', 'recovery', 'continuity', 'incident']):
        return 'CISA4', CISA_DOMAINS['CISA4']['name']
    elif any(k in topic_lower for k in ['security', 'protection', 'access', 'encryption', 'network', 'firewall']):
        return 'CISA5', CISA_DOMAINS['CISA5']['name']
    else:
        return 'CISA1', CISA_DOMAINS['CISA1']['name']  # Default

def generate_script(topic_data):
    """Generate a video script using Gemini AI."""
    topic = topic_data['topic']
    subtopics = list(topic_data.get('subtopics', {}).keys())[:3]
    sample_questions = topic_data.get('sample_questions', [])
    
    domain_id, domain_name = get_domain_for_topic(topic)
    
    prompt = SCRIPT_PROMPT_TEMPLATE.format(
        topic=topic,
        domain_name=domain_name,
        subtopic=", ".join(subtopics) if subtopics else "General",
        sample_questions="\n".join(f"- {q}" for q in sample_questions) if sample_questions else "N/A"
    )
    
    if not GEMINI_API_KEY:
        print(f"  ⚠️ No Gemini API key - using placeholder script")
        return f"[Placeholder script for {topic}]"
    
    try:
        response = requests.post(
            f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
            headers={"Content-Type": "application/json"},
            json={
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {
                    "temperature": 0.7,
                    "maxOutputTokens": 1000
                }
            },
            timeout=60
        )
        response.raise_for_status()
        
        result = response.json()
        script = result['candidates'][0]['content']['parts'][0]['text']
        return script.strip()
        
    except Exception as e:
        print(f"  ❌ Error generating script: {e}")
        return None

def generate_scripts_for_topics(topics_file=None, max_topics=10):
    """Generate scripts for top N hardest topics."""
    print("=" * 60)
    print("📝 CISA Video Script Generator")
    print("=" * 60)
    
    # Load topics analysis
    if topics_file is None:
        topics_file = Path(__file__).parent / "output" / "topics_analysis.json"
    
    if not topics_file.exists():
        print("❌ No topics analysis found. Run analyze_topics.py first.")
        return []
    
    with open(topics_file, 'r') as f:
        analysis = json.load(f)
    
    topics = analysis['recommended_for_videos'][:max_topics]
    print(f"\n🎯 Generating scripts for {len(topics)} topics\n")
    
    generated = []
    
    for i, topic_data in enumerate(topics, 1):
        topic = topic_data['topic']
        safe_name = topic.replace(' ', '_').replace('/', '-')[:50]
        script_file = Path(SCRIPTS_DIR) / f"{i:02d}_{safe_name}.txt"
        
        print(f"[{i}/{len(topics)}] {topic}")
        
        # Skip if already exists
        if script_file.exists():
            print(f"  ⏭️ Script already exists, skipping")
            with open(script_file, 'r') as f:
                script = f.read()
        else:
            script = generate_script(topic_data)
            
            if script:
                with open(script_file, 'w', encoding='utf-8') as f:
                    f.write(script)
                print(f"  ✅ Saved: {script_file.name}")
            else:
                print(f"  ❌ Failed to generate script")
                continue
        
        domain_id, domain_name = get_domain_for_topic(topic)
        
        generated.append({
            'id': f"CISA-VIDEO-{i:03d}",
            'topic': topic,
            'domain': domain_id,
            'domain_name': domain_name,
            'script_file': str(script_file),
            'script_preview': script[:200] + "..." if len(script) > 200 else script,
            'difficulty_score': topic_data.get('difficulty_score', 0)
        })
    
    # Save manifest
    manifest_file = Path(__file__).parent / "output" / "scripts_manifest.json"
    with open(manifest_file, 'w', encoding='utf-8') as f:
        json.dump(generated, f, indent=2)
    
    print(f"\n✅ Generated {len(generated)} scripts")
    print(f"📄 Manifest: {manifest_file}")
    
    return generated

if __name__ == "__main__":
    generate_scripts_for_topics(max_topics=10)
