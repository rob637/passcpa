import os

file_path = '/workspaces/passcpa/src/data/lessons/index.js'

with open(file_path, 'r') as f:
    lines = f.readlines()

start_index = -1
end_index = -1

# Find the start of the BEC section
for i in range(len(lines)):
    if 'BEC - BUSINESS ENVIRONMENT AND CONCEPTS' in lines[i]:
        # The separator is the line before: "  // =========================================="
        # We also want to remove the preceding "  ]," from the PREVIOUS section?
        # No, the previous section ends with structure.
        # But wait, looking at:
        # `    },\n  ],\n\n  // =====`
        # We want to keep `  ],` of the previous section.
        start_index = i - 1
        break

# Find the end of the BEC section. 
for i in range(len(lines)):
    if 'export const getAllLessons' in lines[i]:
        # Walk back to find "};"
        for j in range(i, 0, -1):
            if '};' in lines[j]:
                end_index = j # This is the line with "};" which we want to KEEP.
                break
        break

if start_index != -1 and end_index != -1:
    print(f"Removing from line {start_index} to {end_index}")
    
    # We remove lines from start_index up to end_index (not including end_index)
    
    new_content = lines[:start_index] + lines[end_index:]
    
    # Verify we didn't break syntax.
    # The previous section (REG) ends with `  ],`.
    # Our new content starts with `};`
    # So valid JSON object termination: `... ],\n};`
    # Wait, `LESSONS` object has properties.
    # `reg: [...],`
    # The comma is there in `reg`.
    # So `reg: [...],\n};` is valid JS but trailing comma.
    
    with open(file_path, 'w') as f:
        f.writelines(new_content)
    print("Successfully removed BEC section.")
else:
    print("Could not find BEC section boundaries.")
    print(f"Start found: {start_index != -1}")
    print(f"End found: {end_index != -1}")
