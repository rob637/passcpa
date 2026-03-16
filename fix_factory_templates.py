import re

with open('scripts/course_factory_templates.py', 'r') as f:
    content = f.read()

replacement1 = """def auto_update_question_service(job: dict) -> bool:
    print(f"    ✅ questionService now resolves routes dynamically (no update needed)")
    return True

def auto_update_adaptive_engine_adapter(job: dict) -> bool:
    print(f"    ✅ adaptiveEngineAdapter now uses dynamic imports (no update needed)")
    return True
"""

pattern = re.compile(r'def auto_update_question_service\(job: dict\) -> bool:.*?def auto_update_exam_service', re.DOTALL)

new_content = pattern.sub(replacement1 + '\n\ndef auto_update_exam_service', content)

with open('scripts/course_factory_templates.py', 'w') as f:
    f.write(new_content)

print("Updated template functions")
