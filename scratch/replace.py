import os, glob

for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    content = content.replace('favicon.svg', 'favicon.png').replace('type="image/svg+xml"', 'type="image/png"')
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
