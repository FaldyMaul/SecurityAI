
import re
import os
from docx import Document
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

def add_formatted_text(paragraph, text):
    """
    Parses text for **bold** and *italic* and adds runs to paragraph.
    Current limitation: Doesn't handle nested formatting or escaped characters perfectly.
    """
    # Pattern to capture **bold** or *italic*
    # Group 1: **bold**
    # Group 2: *italic*
    # We split by the pattern to preserve order
    tokens = re.split(r'(\*\*.*?\*\*|\*.*?\*)', text)
    
    for token in tokens:
        if token.startswith('**') and token.endswith('**') and len(token) > 4:
            run = paragraph.add_run(token[2:-2])
            run.bold = True
        elif token.startswith('*') and token.endswith('*') and len(token) > 2:
            run = paragraph.add_run(token[1:-1])
            run.italic = True
        else:
            if token:
                paragraph.add_run(token)

def create_table(doc, lines):
    """
    Creates a docx table from a list of markdown table lines.
    """
    if not lines:
        return

    # Parse header
    header_line = lines[0]
    headers = [h.strip() for h in header_line.split('|') if h.strip()]
    
    # Check if lines[1] is separator (contains ---), if so skip it
    start_row_idx = 1
    if len(lines) > 1 and '---' in lines[1]:
        start_row_idx = 2
    
    table = doc.add_table(rows=1, cols=len(headers))
    table.style = 'Table Grid'
    
    # Header Row
    hdr_cells = table.rows[0].cells
    for i, header_text in enumerate(headers):
        # hdr_cells[i].text = header_text # Simple text
        # Use formatted text for headers too?
        p = hdr_cells[i].paragraphs[0]
        add_formatted_text(p, header_text)
        # Make header bold
        for run in p.runs:
            run.bold = True

    # Data Rows
    for line in lines[start_row_idx:]:
        cols = [c.strip() for c in line.split('|')]
        # Markdown tables usually have empty start/end strings if using | start | end |
        if line.strip().startswith('|'):
            cols = cols[1:]
        if line.strip().endswith('|'):
            cols = cols[:-1]
            
        # Truncate or pad to match header count
        if len(cols) > len(headers):
            cols = cols[:len(headers)]
        
        row_cells = table.add_row().cells
        for i, col_text in enumerate(cols):
            if i < len(row_cells):
                p = row_cells[i].paragraphs[0]
                add_formatted_text(p, col_text)

def markdown_to_docx(md_path, docx_path):
    document = Document()
    
    # Set default font
    style = document.styles['Normal']
    font = style.font
    font.name = 'Calibri'
    font.size = Pt(11)

    with open(md_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # Skip empty lines
        if not line:
            i += 1
            continue

        # Detect Table Start
        if line.startswith('|') and i + 1 < len(lines) and '---|' in lines[i+1]:
            table_lines = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                table_lines.append(lines[i].strip())
                i += 1
            create_table(document, table_lines)
            continue
            
        # Headers
        if line.startswith('# '):
            document.add_heading(line[2:], level=1)
        elif line.startswith('## '):
            document.add_heading(line[3:], level=2)
        elif line.startswith('### '):
            document.add_heading(line[4:], level=3)
        
        # Blockquotes
        elif line.startswith('> '):
            p = document.add_paragraph()
            add_formatted_text(p, line[2:])
            for run in p.runs:
                run.italic = True
                run.font.color.rgb = RGBColor(100, 100, 100) # Gray
            # Indent blockquote
            p.paragraph_format.left_indent = Inches(0.25)
        
        # Horizontal Rule
        elif line.startswith('---') or line.startswith('___'):
            # Add a bottom border to the previous paragraph or a visual line
            # Simple dash line for now
            p = document.add_paragraph()
            run = p.add_run('__________________________________________________')
            run.font.color.rgb = RGBColor(200, 200, 200)

        # List items (Bullet)
        elif line.startswith('- ') or line.startswith('* '):
            p = document.add_paragraph(style='List Bullet')
            add_formatted_text(p, line[2:])

        # List items (Numbered)
        elif re.match(r'^\d+\.', line):
            text = re.sub(r'^\d+\.\s*', '', line)
            p = document.add_paragraph(style='List Number')
            add_formatted_text(p, text)
            
        # Normal text
        else:
            p = document.add_paragraph()
            add_formatted_text(p, line)
        
        i += 1

    try:
        document.save(docx_path)
        print(f"Successfully converted {md_path} to {docx_path}")
    except PermissionError:
        print(f"Error: Could not save to {docx_path}. Please close the file if it is open.")

if __name__ == "__main__":
    md_file = r"D:\Work\PAM\SecurityAI\Research\data_leakage_scenarios.md"
    doc_file = r"D:\Work\PAM\SecurityAI\Research\data_leakage_scenarios_formatted.docx"
    markdown_to_docx(md_file, doc_file)
