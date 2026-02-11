#!/usr/bin/env python3
"""
Analyze CISA questions to identify the hardest topics needing video content.
"""
import os
import re
import json
from collections import defaultdict
from pathlib import Path

# Path to CISA questions
QUESTIONS_DIR = Path(__file__).parent.parent.parent / "src" / "data" / "cisa" / "questions"
OUTPUT_FILE = Path(__file__).parent / "output" / "topics_analysis.json"

def extract_questions_from_file(filepath):
    """Parse TypeScript question file and extract questions."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    questions = []
    
    # Regex to extract question objects
    # Match each question block
    pattern = r"\{\s*id:\s*['\"]([^'\"]+)['\"].*?difficulty:\s*['\"]([^'\"]+)['\"].*?question:\s*['\"]([^'\"]+)['\"].*?topic:\s*['\"]([^'\"]+)['\"].*?subtopic:\s*['\"]([^'\"]+)['\"]"
    
    matches = re.findall(pattern, content, re.DOTALL)
    
    for match in matches:
        questions.append({
            'id': match[0],
            'difficulty': match[1],
            'question': match[2][:200],  # First 200 chars
            'topic': match[3],
            'subtopic': match[4]
        })
    
    return questions

def analyze_topics():
    """Analyze all CISA questions and find hardest topics."""
    print("=" * 60)
    print("🔍 CISA Topic Analysis")
    print("=" * 60)
    
    all_questions = []
    
    # Read all question files
    for qfile in QUESTIONS_DIR.glob("*.ts"):
        if qfile.name == "index.ts":
            continue
        questions = extract_questions_from_file(qfile)
        all_questions.extend(questions)
        print(f"  📄 {qfile.name}: {len(questions)} questions")
    
    print(f"\n📊 Total questions analyzed: {len(all_questions)}")
    
    # Group by topic and subtopic
    topic_stats = defaultdict(lambda: {
        'hard': 0, 
        'medium': 0, 
        'easy': 0, 
        'total': 0,
        'sample_questions': [],
        'subtopics': defaultdict(lambda: {'hard': 0, 'medium': 0, 'easy': 0})
    })
    
    for q in all_questions:
        topic = q['topic']
        subtopic = q['subtopic']
        difficulty = q['difficulty']
        
        topic_stats[topic]['total'] += 1
        topic_stats[topic][difficulty] += 1
        topic_stats[topic]['subtopics'][subtopic][difficulty] += 1
        
        # Keep sample hard questions
        if difficulty == 'hard' and len(topic_stats[topic]['sample_questions']) < 3:
            topic_stats[topic]['sample_questions'].append(q['question'])
    
    # Calculate difficulty score (higher = harder topic)
    ranked_topics = []
    for topic, stats in topic_stats.items():
        # Score: weight hard questions heavily
        if stats['total'] > 0:
            difficulty_score = (stats['hard'] * 3 + stats['medium'] * 1) / stats['total']
            ranked_topics.append({
                'topic': topic,
                'difficulty_score': round(difficulty_score, 2),
                'hard_count': stats['hard'],
                'medium_count': stats['medium'],
                'easy_count': stats['easy'],
                'total': stats['total'],
                'sample_questions': stats['sample_questions'],
                'subtopics': dict(stats['subtopics'])
            })
    
    # Sort by difficulty score descending
    ranked_topics.sort(key=lambda x: x['difficulty_score'], reverse=True)
    
    # Print top 20 hardest topics
    print("\n🔥 TOP 20 HARDEST CISA TOPICS (for video creation)")
    print("-" * 60)
    
    for i, topic in enumerate(ranked_topics[:20], 1):
        print(f"{i:2}. {topic['topic']}")
        print(f"    Score: {topic['difficulty_score']:.2f} | Hard: {topic['hard_count']} | Med: {topic['medium_count']} | Total: {topic['total']}")
    
    # Save full analysis
    output = {
        'analysis_date': str(Path(__file__).stat().st_mtime),
        'total_questions': len(all_questions),
        'ranked_topics': ranked_topics,
        'recommended_for_videos': ranked_topics[:20]
    }
    
    os.makedirs(OUTPUT_FILE.parent, exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2)
    
    print(f"\n✅ Analysis saved to: {OUTPUT_FILE}")
    
    return ranked_topics[:20]

if __name__ == "__main__":
    analyze_topics()
