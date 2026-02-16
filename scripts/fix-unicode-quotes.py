#!/usr/bin/env python3
"""Fix Unicode curly quotes and special dashes in TypeScript question files."""

import sys

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace curly quotes with escaped apostrophes (for single-quoted TS strings)
    content = content.replace('\u2019', "\\'")  # ' right single quote
    content = content.replace('\u2018', "\\'")  # ' left single quote
    
    # Replace curly double quotes with straight double quotes
    content = content.replace('\u201c', '"')  # " left double quote
    content = content.replace('\u201d', '"')  # " right double quote
    
    # Replace em dash and en dash with hyphen
    content = content.replace('\u2014', '-')  # — em dash
    content = content.replace('\u2013', '-')  # – en dash
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'Fixed: {filepath}')

if __name__ == '__main__':
    for filepath in sys.argv[1:]:
        fix_file(filepath)
