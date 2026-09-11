import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_kr2_deck():
    prs = Presentation()
    # Set slide dimensions to widescreen 16:9 (13.333 x 7.5 inches)
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Base workspace directory
    base_dir = r"d:\Work\PAM\SecurityAI"

    # Image Paths from Moonshot Suite
    img_ui_homepage = os.path.join(base_dir, r"moonshot-install\moonshot\misc\ui-homepage.png")
    img_create_endpoint = os.path.join(base_dir, r"moonshot-install\moonshot\docs\user_guide\web_ui\imgs\create_endpoint.png")
    img_run_progress = os.path.join(base_dir, r"moonshot-install\moonshot\docs\user_guide\web_ui\imgs\run_progress(13).png")
    img_report_example = os.path.join(base_dir, r"moonshot-install\moonshot\misc\report-example.png")

    # Color Palette - Modern Security Theme (Dark Navy, Deep Slate, Cyan/Teal accent, Accent Green, Light Gray text)
    DARK_BG = RGBColor(15, 23, 42)       # Slate 900
    CARD_BG = RGBColor(30, 41, 59)       # Slate 800
    CARD_BORDER = RGBColor(51, 65, 85)   # Slate 700
    TEXT_LIGHT = RGBColor(248, 250, 252)# Slate 50
    TEXT_MUTED = RGBColor(148, 163, 184)# Slate 400
    CYAN_ACCENT = RGBColor(56, 189, 248) # Sky 400
    GREEN_ACCENT = RGBColor(52, 211, 153)# Emerald 400
    AMBER_ACCENT = RGBColor(251, 191, 36)# Amber 400
    RED_ACCENT = RGBColor(248, 113, 113) # Red 400
    TABLE_HEADER_BG = RGBColor(15, 118, 110) # Teal 700

    def apply_background(slide, color=DARK_BG):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = color

    def add_header(slide, title_text, category_text="OKR KR2 DETAIL REPORT"):
        # Header category tag
        tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(0.3))
        tf_tag = tag_box.text_frame
        tf_tag.word_wrap = True
        tf_tag.margin_left = tf_tag.margin_top = tf_tag.margin_right = tf_tag.margin_bottom = 0
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = category_text.upper()
        p_tag.font.size = Pt(10)
        p_tag.font.bold = True
        p_tag.font.color.rgb = CYAN_ACCENT
        p_tag.font.name = 'Calibri'

        # Main Slide Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.65), Inches(11.7), Inches(0.6))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        tf_title.margin_left = tf_title.margin_top = tf_title.margin_right = tf_title.margin_bottom = 0
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_LIGHT
        p_title.font.name = 'Calibri'

        # Divider line
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.3), Inches(11.733), Inches(0.02))
        line.fill.solid()
        line.fill.fore_color.rgb = CARD_BORDER
        line.line.color.rgb = CARD_BORDER

    blank_layout = prs.slide_layouts[6]

    # -------------------------------------------------------------
    # SLIDE 1: Title Slide
    # -------------------------------------------------------------
    slide1 = prs.slides.add_slide(blank_layout)
    apply_background(slide1)

    # Accent decorative box
    dec_box = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5), Inches(11.733), Inches(4.5))
    dec_box.fill.solid()
    dec_box.fill.fore_color.rgb = CARD_BG
    dec_box.line.color.rgb = CYAN_ACCENT
    dec_box.line.width = Pt(1.5)

    # Badge box
    badge = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.2), Inches(1.9), Inches(3.2), Inches(0.4))
    badge.fill.solid()
    badge.fill.fore_color.rgb = RGBColor(13, 148, 136) # Teal
    badge.line.fill.background()
    p_b = badge.text_frame.paragraphs[0]
    p_b.text = "Q2 2026 OKR ACHIEVEMENT: 238%"
    p_b.alignment = PP_ALIGN.CENTER
    p_b.font.size = Pt(11)
    p_b.font.bold = True
    p_b.font.color.rgb = TEXT_LIGHT

    # Main Title Text
    tbox = slide1.shapes.add_textbox(Inches(1.2), Inches(2.5), Inches(11), Inches(1.8))
    tf = tbox.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = "KR 2 Detail Report: Pipeline & Connector\nConfigurations"
    p1.font.size = Pt(32)
    p1.font.bold = True
    p1.font.color.rgb = TEXT_LIGHT

    p2 = tf.add_paragraph()
    p2.text = "Standardizing AI Verify Moonshot Assessment Pipelines & Zero-Crash Endpoint Connectors"
    p2.font.size = Pt(16)
    p2.font.color.rgb = CYAN_ACCENT
    p2.space_before = Pt(12)

    # KPI summary pills inside title slide
    kpi_specs = [
        ("TARGET ENDPOINTS", "8 Configs"),
        ("ACTUAL DELIVERED", "19 Configs"),
        ("ACHIEVEMENT", "238%"),
        ("CONNECTORS", "14 Python Files")
    ]
    for i, (label, val) in enumerate(kpi_specs):
        left_pos = Inches(1.2 + i * 2.7)
        k_shape = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, Inches(4.7), Inches(2.5), Inches(0.9))
        k_shape.fill.solid()
        k_shape.fill.fore_color.rgb = RGBColor(15, 23, 42)
        k_shape.line.color.rgb = CARD_BORDER
        ktf = k_shape.text_frame
        ktf.word_wrap = True
        kp1 = ktf.paragraphs[0]
        kp1.text = label
        kp1.font.size = Pt(9)
        kp1.font.bold = True
        kp1.font.color.rgb = TEXT_MUTED
        kp1.alignment = PP_ALIGN.CENTER
        
        kp2 = ktf.add_paragraph()
        kp2.text = val
        kp2.font.size = Pt(14)
        kp2.font.bold = True
        kp2.font.color.rgb = GREEN_ACCENT if "238" in val or "19" in val else CYAN_ACCENT
        kp2.alignment = PP_ALIGN.CENTER

    # Footer metadata
    fbox = slide1.shapes.add_textbox(Inches(0.8), Inches(6.8), Inches(11.733), Inches(0.4))
    ftf = fbox.text_frame
    fp = ftf.paragraphs[0]
    fp.text = "Security & AI Governance | PAM Enterprise AI Security Project | Telkom Group 2026"
    fp.font.size = Pt(10)
    fp.font.color.rgb = TEXT_MUTED

    # -------------------------------------------------------------
    # SLIDE 2: Executive Performance Summary
    # -------------------------------------------------------------
    slide2 = prs.slides.add_slide(blank_layout)
    apply_background(slide2)
    add_header(slide2, "Executive Performance Summary & Key Achievements")

    # Metric Cards Row
    cards_data = [
        ("VERIFIED ENDPOINTS", "19 Configs", "Target: 8 Endpoints (238% Rate)", GREEN_ACCENT),
        ("CONNECTOR SCRIPTS", "14 Python Files", "Custom & standardized connectors", CYAN_ACCENT),
        ("ERROR HANDLING", "HTTP 403 / 405", "Graceful LiteLLM block catching", AMBER_ACCENT),
        ("PIPELINE STABILITY", "100% ZERO-CRASH", "Seamless Moonshot execution runs", GREEN_ACCENT)
    ]
    for i, (title, val, sub, col) in enumerate(cards_data):
        c_shape = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8 + i*2.98), Inches(1.6), Inches(2.8), Inches(1.4))
        c_shape.fill.solid()
        c_shape.fill.fore_color.rgb = CARD_BG
        c_shape.line.color.rgb = col
        c_shape.line.width = Pt(1.5)
        
        ctf = c_shape.text_frame
        ctf.word_wrap = True
        cp1 = ctf.paragraphs[0]
        cp1.text = title
        cp1.font.size = Pt(9)
        cp1.font.bold = True
        cp1.font.color.rgb = TEXT_MUTED
        
        cp2 = ctf.add_paragraph()
        cp2.text = val
        cp2.font.size = Pt(14)
        cp2.font.bold = True
        cp2.font.color.rgb = col
        cp2.space_before = Pt(4)
        
        cp3 = ctf.add_paragraph()
        cp3.text = sub
        cp3.font.size = Pt(9)
        cp3.font.color.rgb = TEXT_LIGHT
        cp3.space_before = Pt(4)

    # Key Highlights Box
    hl_box = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(3.2), Inches(11.733), Inches(3.7))
    hl_box.fill.solid()
    hl_box.fill.fore_color.rgb = CARD_BG
    hl_box.line.color.rgb = CARD_BORDER
    
    htf = hl_box.text_frame
    htf.word_wrap = True
    htf.margin_left = Inches(0.3)
    htf.margin_top = Inches(0.3)
    
    hp0 = htf.paragraphs[0]
    hp0.text = "Definition of Done (DoD) & Core Technical Accomplishments:"
    hp0.font.size = Pt(14)
    hp0.font.bold = True
    hp0.font.color.rgb = CYAN_ACCENT

    bullets = [
        ("Substantial Target Exceedance (238%):", "Configured and verified 19 model endpoint JSON configurations (target: 8) covering local models, commercial APIs, open-source models, and automated LLM evaluators."),
        ("AI Verify Moonshot Integration:", "Standardized integration with Singapore's AI Verify Moonshot testing suite (web-api on :5001, web-ui on :3001) for automated benchmark suite execution."),
        ("Resilient Connector Engineering:", "Modified telkom-connector.py and openai-connector.py to intercept HTTP 403 Forbidden / 405 Method Not Allowed responses returned by LiteLLM Guardrails."),
        ("Zero-Crash Benchmark Execution:", "Eliminated unhandled exception crashes during long evaluation runs, converting gateway security blocks into valid test defense logs."),
        ("Multi-Provider Interoperability:", "Enabled evaluation across Ollama (Llama 3/3.1), OpenAI (GPT-4o/GPT-3.5), Azure OpenAI, Together AI (Gemma 2/Llama 3.1 405B), HuggingFace (DeepSeek R1), and Google Gemini.")
    ]
    for b_title, b_desc in bullets:
        bp = htf.add_paragraph()
        bp.space_before = Pt(8)
        
        r1 = bp.add_run()
        r1.text = "•  " + b_title + " "
        r1.font.bold = True
        r1.font.size = Pt(11)
        r1.font.color.rgb = GREEN_ACCENT
        
        r2 = bp.add_run()
        r2.text = b_desc
        r2.font.size = Pt(11)
        r2.font.color.rgb = TEXT_LIGHT

    # -------------------------------------------------------------
    # SLIDE 3: Architecture & Pipeline Execution Flow
    # -------------------------------------------------------------
    slide3 = prs.slides.add_slide(blank_layout)
    apply_background(slide3)
    add_header(slide3, "AI Verify Moonshot Assessment Pipeline Architecture")

    # Flow Architecture Steps (4 Boxes in horizontal chain)
    flow_steps = [
        ("1. Benchmark Runner", "Moonshot Web UI (:3001) triggers evaluation run via Moonshot Web API (:5001)", CYAN_ACCENT),
        ("2. Recipe & Endpoint Selection", "Moonshot selects test recipes & targets 1 of 19 verified endpoint JSON configs", AMBER_ACCENT),
        ("3. Custom Connector Execution", "Python connector routes prompt through LiteLLM Gateway (:4000) with 403/405 recovery", RED_ACCENT),
        ("4. Automated Scoring & Report", "LLM Judge / Annotator grades output and exports structured JSON & PDF reports", GREEN_ACCENT)
    ]
    for i, (stitle, sdesc, scol) in enumerate(flow_steps):
        s_box = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8 + i*2.98), Inches(1.6), Inches(2.8), Inches(2.2))
        s_box.fill.solid()
        s_box.fill.fore_color.rgb = CARD_BG
        s_box.line.color.rgb = scol
        s_box.line.width = Pt(1.5)
        
        stf = s_box.text_frame
        stf.word_wrap = True
        stf.margin_left = stf.margin_right = stf.margin_top = Inches(0.15)
        
        sp1 = stf.paragraphs[0]
        sp1.text = stitle
        sp1.font.size = Pt(12)
        sp1.font.bold = True
        sp1.font.color.rgb = scol
        
        sp2 = stf.add_paragraph()
        sp2.text = sdesc
        sp2.font.size = Pt(10)
        sp2.font.color.rgb = TEXT_LIGHT
        sp2.space_before = Pt(8)

    # Key Architecture Advantages (Bottom split box)
    adv_box = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.1), Inches(11.733), Inches(2.8))
    adv_box.fill.solid()
    adv_box.fill.fore_color.rgb = CARD_BG
    adv_box.line.color.rgb = CARD_BORDER
    
    atf = adv_box.text_frame
    atf.word_wrap = True
    atf.margin_left = Inches(0.3)
    atf.margin_top = Inches(0.2)
    
    ap0 = atf.paragraphs[0]
    ap0.text = "Key Pipeline Standardization Strengths:"
    ap0.font.size = Pt(13)
    ap0.font.bold = True
    ap0.font.color.rgb = CYAN_ACCENT

    adv_bullets = [
        ("Modular Connector Protocol:", "14 specialized Python connectors allow plug-and-play addition of new LLMs without modifying core Moonshot execution logic."),
        ("Zero-Crash Fault Isolation:", "Custom exception handling isolates gateway status codes (HTTP 403/405), protecting multi-hour batch benchmark runs from abrupt crashes."),
        ("Standardized Evaluation Rubrics:", "Automated LLM-as-a-Judge endpoints (GPT-4) provide objective, reproducible security scoring across all connected models.")
    ]
    for b_title, b_desc in adv_bullets:
        bp = atf.add_paragraph()
        bp.space_before = Pt(6)
        r1 = bp.add_run()
        r1.text = "✔  " + b_title + " "
        r1.font.bold = True
        r1.font.size = Pt(10.5)
        r1.font.color.rgb = GREEN_ACCENT
        
        r2 = bp.add_run()
        r2.text = b_desc
        r2.font.size = Pt(10.5)
        r2.font.color.rgb = TEXT_LIGHT

    # -------------------------------------------------------------
    # SLIDE 4: Endpoints Inventory - Part 1 (Local Gateway & Commercial APIs)
    # -------------------------------------------------------------
    slide4 = prs.slides.add_slide(blank_layout)
    apply_background(slide4)
    add_header(slide4, "Verified Endpoints Inventory (Local Gateway & Commercial APIs)")

    # Left Table: Local Gateway & Custom Models (5 configs)
    t1_box = slide4.shapes.add_table(6, 4, Inches(0.8), Inches(1.6), Inches(5.7), Inches(3.4))
    table1 = t1_box.table
    table1.columns[0].width = Inches(0.4)
    table1.columns[1].width = Inches(1.8)
    table1.columns[2].width = Inches(1.7)
    table1.columns[3].width = Inches(1.8)

    headers1 = ["#", "Config File", "Model Target", "Protocol / Route"]
    for j, h in enumerate(headers1):
        cell = table1.cell(0, j)
        cell.fill.solid()
        cell.fill.fore_color.rgb = TABLE_HEADER_BG
        p = cell.text_frame.paragraphs[0]
        p.text = h
        p.font.bold = True
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_LIGHT
        p.alignment = PP_ALIGN.CENTER

    local_rules = [
        ("1", "gemma.json", "gemma-4-26B-A4B-it", "HTTPS / Gateway"),
        ("2", "telkom-ai.json", "telkom-ai-v1", "HTTP / Direct"),
        ("3", "telkom-ai-v2.json", "telkom-ai-v2", "HTTPS / LiteLLM"),
        ("4", "ollama-llama3.json", "llama3:8b", "HTTP / Ollama"),
        ("5", "ollama-llama31.json", "llama3.1:8b", "HTTP / Ollama")
    ]
    for i, row in enumerate(local_rules):
        for j, val in enumerate(row):
            cell = table1.cell(i+1, j)
            cell.fill.solid()
            cell.fill.fore_color.rgb = CARD_BG if i % 2 == 0 else RGBColor(20, 30, 48)
            p = cell.text_frame.paragraphs[0]
            p.text = val
            p.font.size = Pt(9.5)
            p.font.color.rgb = TEXT_LIGHT if j != 3 else GREEN_ACCENT
            if j == 0 or j == 3:
                p.alignment = PP_ALIGN.CENTER

    # Left Note Box
    note_box4 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.2), Inches(5.7), Inches(1.5))
    note_box4.fill.solid()
    note_box4.fill.fore_color.rgb = CARD_BG
    note_box4.line.color.rgb = CYAN_ACCENT
    ntf4 = note_box4.text_frame
    ntf4.word_wrap = True
    ntf4.margin_left = Inches(0.2)
    ntf4.margin_top = Inches(0.15)
    np04 = ntf4.paragraphs[0]
    np04.text = "Local & Internal Model Scope:"
    np04.font.size = Pt(11)
    np04.font.bold = True
    np04.font.color.rgb = CYAN_ACCENT
    np14 = ntf4.add_paragraph()
    np14.text = "• Connects internal Telkom AI & Gemma models via LiteLLM.\n• Enables offline benchmark execution using local Ollama endpoints."
    np14.font.size = Pt(9.5)
    np14.font.color.rgb = TEXT_LIGHT
    np14.space_before = Pt(4)

    # Right Table: Commercial API Endpoints (6 configs)
    t2_box = slide4.shapes.add_table(7, 4, Inches(6.8), Inches(1.6), Inches(5.733), Inches(5.1))
    table2 = t2_box.table
    table2.columns[0].width = Inches(0.4)
    table2.columns[1].width = Inches(2.2)
    table2.columns[2].width = Inches(1.4)
    table2.columns[3].width = Inches(1.733)

    for j, h in enumerate(headers1):
        cell = table2.cell(0, j)
        cell.fill.solid()
        cell.fill.fore_color.rgb = TABLE_HEADER_BG
        p = cell.text_frame.paragraphs[0]
        p.text = h
        p.font.bold = True
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_LIGHT
        p.alignment = PP_ALIGN.CENTER

    comm_rules = [
        ("6", "openai-gpt4o.json", "gpt-4o-mini", "OpenAI Direct"),
        ("7", "openai-gpt35-turbo.json", "gpt-3.5-turbo", "OpenAI Direct"),
        ("8", "openai-gpt35-turbo-16k.json", "gpt-3.5-turbo-16k", "OpenAI Direct"),
        ("9", "openai-gpt4.json", "gpt-4", "OpenAI Direct"),
        ("10", "azure-openai-gpt4o.json", "gpt-4o", "Azure OpenAI"),
        ("11", "azure-openai-gpt4-turbo.json", "gpt-4-turbo", "Azure OpenAI")
    ]
    for i, row in enumerate(comm_rules):
        for j, val in enumerate(row):
            cell = table2.cell(i+1, j)
            cell.fill.solid()
            cell.fill.fore_color.rgb = CARD_BG if i % 2 == 0 else RGBColor(20, 30, 48)
            p = cell.text_frame.paragraphs[0]
            p.text = val
            p.font.size = Pt(9)
            p.font.color.rgb = TEXT_LIGHT if j != 3 else GREEN_ACCENT
            if j == 0 or j == 3:
                p.alignment = PP_ALIGN.CENTER

    # -------------------------------------------------------------
    # SLIDE 5: Endpoints Inventory - Part 2 (OSS Models & Evaluator Guards)
    # -------------------------------------------------------------
    slide5 = prs.slides.add_slide(blank_layout)
    apply_background(slide5)
    add_header(slide5, "Verified Endpoints Inventory (OSS Models & Evaluators)")

    # Left Table: OSS & Specialized Models (5 configs)
    t3_box = slide5.shapes.add_table(6, 4, Inches(0.8), Inches(1.6), Inches(5.7), Inches(3.4))
    table3 = t3_box.table
    table3.columns[0].width = Inches(0.4)
    table3.columns[1].width = Inches(2.2)
    table3.columns[2].width = Inches(1.5)
    table3.columns[3].width = Inches(1.6)

    for j, h in enumerate(headers1):
        cell = table3.cell(0, j)
        cell.fill.solid()
        cell.fill.fore_color.rgb = TABLE_HEADER_BG
        p = cell.text_frame.paragraphs[0]
        p.text = h
        p.font.bold = True
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_LIGHT
        p.alignment = PP_ALIGN.CENTER

    oss_rules = [
        ("12", "together-gemma2-27b.json", "Gemma 2 27B", "Together AI"),
        ("13", "together-llama-405b.json", "Llama 3.1 405B", "Together AI"),
        ("14", "huggingface-deepseekr1.json", "DeepSeek R1", "HuggingFace"),
        ("15", "google-gemini-flash-15.json", "Gemini 1.5 Flash", "Google Vertex"),
        ("16", "google-gemini-pro-15.json", "Gemini 1.5 Pro", "Google Vertex")
    ]
    for i, row in enumerate(oss_rules):
        for j, val in enumerate(row):
            cell = table3.cell(i+1, j)
            cell.fill.solid()
            cell.fill.fore_color.rgb = CARD_BG if i % 2 == 0 else RGBColor(20, 30, 48)
            p = cell.text_frame.paragraphs[0]
            p.text = val
            p.font.size = Pt(8.5)
            p.font.color.rgb = TEXT_LIGHT if j != 3 else GREEN_ACCENT
            if j == 0 or j == 3:
                p.alignment = PP_ALIGN.CENTER

    # Left Note Box
    note_box5 = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.2), Inches(5.7), Inches(1.5))
    note_box5.fill.solid()
    note_box5.fill.fore_color.rgb = CARD_BG
    note_box5.line.color.rgb = CYAN_ACCENT
    ntf5 = note_box5.text_frame
    ntf5.word_wrap = True
    ntf5.margin_left = Inches(0.2)
    ntf5.margin_top = Inches(0.15)
    np05 = ntf5.paragraphs[0]
    np05.text = "Open-Source & Frontier Model Coverage:"
    np05.font.size = Pt(11)
    np05.font.bold = True
    np05.font.color.rgb = CYAN_ACCENT
    np15 = ntf5.add_paragraph()
    np15.text = "• Integrates Together AI, HuggingFace, & Google Gemini endpoints.\n• Enables comparative benchmark analysis against top global models."
    np15.font.size = Pt(9.5)
    np15.font.color.rgb = TEXT_LIGHT
    np15.space_before = Pt(4)

    # Right Table: Evaluator & Guard Endpoints (3 configs) + Summary Box
    t4_box = slide5.shapes.add_table(4, 4, Inches(6.8), Inches(1.6), Inches(5.733), Inches(2.6))
    table4 = t4_box.table
    table4.columns[0].width = Inches(0.4)
    table4.columns[1].width = Inches(2.4)
    table4.columns[2].width = Inches(1.4)
    table4.columns[3].width = Inches(1.533)

    for j, h in enumerate(headers1):
        cell = table4.cell(0, j)
        cell.fill.solid()
        cell.fill.fore_color.rgb = TABLE_HEADER_BG
        p = cell.text_frame.paragraphs[0]
        p.text = h
        p.font.bold = True
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_LIGHT
        p.alignment = PP_ALIGN.CENTER

    eval_rules = [
        ("17", "llm-judge-openai-gpt4.json", "LLM-as-a-Judge", "OpenAI GPT-4"),
        ("18", "llm-judge-azure-gpt4.json", "LLM-as-a-Judge", "Azure GPT-4"),
        ("19", "refusal-evaluator.json", "Refusal Matcher", "Regex Engine")
    ]
    for i, row in enumerate(eval_rules):
        for j, val in enumerate(row):
            cell = table4.cell(i+1, j)
            cell.fill.solid()
            cell.fill.fore_color.rgb = CARD_BG if i % 2 == 0 else RGBColor(20, 30, 48)
            p = cell.text_frame.paragraphs[0]
            p.text = val
            p.font.size = Pt(8.5)
            p.font.color.rgb = TEXT_LIGHT if j != 3 else AMBER_ACCENT
            if j == 0 or j == 3:
                p.alignment = PP_ALIGN.CENTER

    # Right Note Box
    note_box5r = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(4.5), Inches(5.733), Inches(2.2))
    note_box5r.fill.solid()
    note_box5r.fill.fore_color.rgb = CARD_BG
    note_box5r.line.color.rgb = AMBER_ACCENT
    ntf5r = note_box5r.text_frame
    ntf5r.word_wrap = True
    ntf5r.margin_left = Inches(0.2)
    ntf5r.margin_top = Inches(0.15)
    np05r = ntf5r.paragraphs[0]
    np05r.text = "Automated Grading & Evaluator Engines:"
    np05r.font.size = Pt(11)
    np05r.font.bold = True
    np05r.font.color.rgb = AMBER_ACCENT
    np15r = ntf5r.add_paragraph()
    np15r.text = "• GPT-4 Annotator endpoints automate objective score grading.\n• Rule-based refusal evaluator detects explicit safety rejection signatures."
    np15r.font.size = Pt(9.5)
    np15r.font.color.rgb = TEXT_LIGHT
    np15r.space_before = Pt(4)

    # -------------------------------------------------------------
    # SLIDE 6: Technical Exception Handling & Connectors
    # -------------------------------------------------------------
    slide6 = prs.slides.add_slide(blank_layout)
    apply_background(slide6)
    add_header(slide6, "Custom Connector Engineering & Zero-Crash Error Handlers")

    # Left Box: Python Code Snippet Container
    code_box = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(6.2), Inches(5.1))
    code_box.fill.solid()
    code_box.fill.fore_color.rgb = RGBColor(10, 15, 26)
    code_box.line.color.rgb = CYAN_ACCENT
    
    ctf6 = code_box.text_frame
    ctf6.word_wrap = True
    ctf6.margin_left = Inches(0.25)
    ctf6.margin_top = Inches(0.25)
    
    cp06 = ctf6.paragraphs[0]
    cp06.text = "# Resilient Exception Handler (telkom-connector.py)"
    cp06.font.size = Pt(10)
    cp06.font.bold = True
    cp06.font.color.rgb = CYAN_ACCENT
    
    code_text = """def send_prompt_to_gateway(endpoint, payload, headers):
    try:
        response = requests.post(endpoint, json=payload, 
                                 headers=headers, timeout=30)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]
    except requests.exceptions.HTTPError as err:
        if err.response.status_code in [403, 405]:
            # Gracefully log guardrail block
            logger.info(f"Guardrail Block Intercepted "
                        f"[HTTP {err.response.status_code}]")
            return "[SECURITY_GUARDRAIL_BLOCKED]"
        else:
            raise err"""
    cp16 = ctf6.add_paragraph()
    cp16.text = code_text
    cp16.font.size = Pt(9.5)
    cp16.font.name = 'Consolas'
    cp16.font.color.rgb = RGBColor(226, 232, 240)
    cp16.space_before = Pt(8)

    # Right Box: Mechanics Breakdown
    r_box = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.3), Inches(1.6), Inches(5.233), Inches(5.1))
    r_box.fill.solid()
    r_box.fill.fore_color.rgb = CARD_BG
    r_box.line.color.rgb = CARD_BORDER
    
    rtf6 = r_box.text_frame
    rtf6.word_wrap = True
    rtf6.margin_left = Inches(0.3)
    rtf6.margin_top = Inches(0.25)
    
    rp0 = rtf6.paragraphs[0]
    rp0.text = "Custom Connectors Engineering (14 Python Files):"
    rp0.font.size = Pt(13)
    rp0.font.bold = True
    rp0.font.color.rgb = GREEN_ACCENT

    mech_bullets = [
        ("Enhanced Connectors:", "telkom-connector.py & openai-connector.py updated with custom status code interception."),
        ("HTTP 403/405 Interception:", "LiteLLM Gateway signals guardrail interventions via HTTP 403 Forbidden / 405 Method Not Allowed."),
        ("Zero-Crash Execution Rate:", "Exceptions are logged as successful security blocks rather than causing benchmark runner crashes."),
        ("Full Connector Suite:", "14 connectors support Bedrock, Anthropic, Azure, Google Gemini, HuggingFace, Together AI, & FlagEval.")
    ]
    for title, desc in mech_bullets:
        bp = rtf6.add_paragraph()
        bp.space_before = Pt(10)
        r1 = bp.add_run()
        r1.text = "•  " + title + " "
        r1.font.bold = True
        r1.font.size = Pt(10.5)
        r1.font.color.rgb = CYAN_ACCENT
        
        r2 = bp.add_run()
        r2.text = desc
        r2.font.size = Pt(10)
        r2.font.color.rgb = TEXT_LIGHT

    # -------------------------------------------------------------
    # SLIDE 7: AI Verify Moonshot Setup Gallery - Part 1 (Embedded Pictures)
    # -------------------------------------------------------------
    slide7 = prs.slides.add_slide(blank_layout)
    apply_background(slide7)
    add_header(slide7, "AI Verify Moonshot Setup Gallery (UI & Endpoint Configs)")

    # Left Container (UI Homepage)
    box7_left = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5), Inches(5.7), Inches(5.4))
    box7_left.fill.solid()
    box7_left.fill.fore_color.rgb = CARD_BG
    box7_left.line.color.rgb = CYAN_ACCENT
    tf7l = box7_left.text_frame
    tf7l.word_wrap = True
    p7l = tf7l.paragraphs[0]
    p7l.text = "📷 AI Verify Moonshot Web UI Dashboard (http://localhost:3001)"
    p7l.font.size = Pt(10.5)
    p7l.font.bold = True
    p7l.font.color.rgb = CYAN_ACCENT

    if os.path.exists(img_ui_homepage):
        slide7.shapes.add_picture(img_ui_homepage, Inches(0.95), Inches(2.0), Inches(5.4), Inches(4.7))

    # Right Container (Endpoint Config UI)
    box7_right = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.5), Inches(5.733), Inches(5.4))
    box7_right.fill.solid()
    box7_right.fill.fore_color.rgb = CARD_BG
    box7_right.line.color.rgb = CYAN_ACCENT
    tf7r = box7_right.text_frame
    tf7r.word_wrap = True
    p7r = tf7r.paragraphs[0]
    p7r.text = "📷 Endpoint Creation & Verification Interface"
    p7r.font.size = Pt(10.5)
    p7r.font.bold = True
    p7r.font.color.rgb = CYAN_ACCENT

    if os.path.exists(img_create_endpoint):
        slide7.shapes.add_picture(img_create_endpoint, Inches(6.95), Inches(2.0), Inches(5.4), Inches(4.7))

    # -------------------------------------------------------------
    # SLIDE 8: AI Verify Moonshot Setup Gallery - Part 2 (Embedded Pictures)
    # -------------------------------------------------------------
    slide8 = prs.slides.add_slide(blank_layout)
    apply_background(slide8)
    add_header(slide8, "AI Verify Moonshot Execution & Assessment Output")

    # Left Container (Run Progress)
    box8_left = slide8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5), Inches(5.7), Inches(5.4))
    box8_left.fill.solid()
    box8_left.fill.fore_color.rgb = CARD_BG
    box8_left.line.color.rgb = CYAN_ACCENT
    tf8l = box8_left.text_frame
    tf8l.word_wrap = True
    p8l = tf8l.paragraphs[0]
    p8l.text = "📷 Benchmark Suite Execution Progress & Status Monitor"
    p8l.font.size = Pt(10.5)
    p8l.font.bold = True
    p8l.font.color.rgb = CYAN_ACCENT

    if os.path.exists(img_run_progress):
        slide8.shapes.add_picture(img_run_progress, Inches(0.95), Inches(2.0), Inches(5.4), Inches(4.7))

    # Right Container (Generated Report Example)
    box8_right = slide8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.5), Inches(5.733), Inches(5.4))
    box8_right.fill.solid()
    box8_right.fill.fore_color.rgb = CARD_BG
    box8_right.line.color.rgb = CYAN_ACCENT
    tf8r = box8_right.text_frame
    tf8r.word_wrap = True
    p8r = tf8r.paragraphs[0]
    p8r.text = "📷 Verified Assessment Report Output (PDF / HTML Score Summary)"
    p8r.font.size = Pt(10.5)
    p8r.font.bold = True
    p8r.font.color.rgb = CYAN_ACCENT

    if os.path.exists(img_report_example):
        slide8.shapes.add_picture(img_report_example, Inches(6.95), Inches(2.0), Inches(5.4), Inches(4.7))

    # -------------------------------------------------------------
    # SLIDE 9: Strategic Roadmap & Final Sign-Off
    # -------------------------------------------------------------
    slide9 = prs.slides.add_slide(blank_layout)
    apply_background(slide9)
    add_header(slide9, "Pipeline Evolution & Key Result Sign-Off")

    # Roadmap Timeline Horizontal Boxes
    phases = [
        ("Q2 2026 (Completed)", "19 Endpoint Configurations\n• 14 Custom Python Connectors\n• AI Verify Moonshot Integration\n• HTTP 403/405 Zero-Crash Recovery", GREEN_ACCENT),
        ("Q3 2026 (Planned)", "Indonesian Testbed Expansion\n• Local Dataset Integration\n• Indonesian Fact & Cultural Risk\n• RAG Hallucination Pipeline", CYAN_ACCENT),
        ("Q4 2026 (Roadmap)", "Release Candidate Certification\n• Full Run Verification\n• Automated CI/CD Benchmarking\n• Low-Risk ('A') Safety Certification", AMBER_ACCENT)
    ]
    for i, (ptitle, pdesc, pcol) in enumerate(phases):
        p_box = slide9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8 + i*3.98), Inches(1.6), Inches(3.8), Inches(3.6))
        p_box.fill.solid()
        p_box.fill.fore_color.rgb = CARD_BG
        p_box.line.color.rgb = pcol
        p_box.line.width = Pt(1.5)
        
        ptf = p_box.text_frame
        ptf.word_wrap = True
        ptf.margin_left = Inches(0.2)
        ptf.margin_top = Inches(0.2)
        
        pp0 = ptf.paragraphs[0]
        pp0.text = ptitle
        pp0.font.size = Pt(11.5)
        pp0.font.bold = True
        pp0.font.color.rgb = pcol
        
        pp1 = ptf.add_paragraph()
        pp1.text = pdesc
        pp1.font.size = Pt(9.5)
        pp1.font.color.rgb = TEXT_LIGHT
        pp1.space_before = Pt(8)

    # Final Sign-off Box
    so_box = slide9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.4), Inches(11.733), Inches(1.3))
    so_box.fill.solid()
    so_box.fill.fore_color.rgb = CARD_BG
    so_box.line.color.rgb = CARD_BORDER
    
    sotf = so_box.text_frame
    sotf.word_wrap = True
    sotf.margin_left = Inches(0.25)
    sotf.margin_top = Inches(0.15)
    
    sop0 = sotf.paragraphs[0]
    sop0.text = "KR 2 Sign-Off & Governance Summary:"
    sop0.font.size = Pt(12)
    sop0.font.bold = True
    sop0.font.color.rgb = GREEN_ACCENT
    
    sop1 = sotf.add_paragraph()
    sop1.text = "Key Result 2 is formally signed off as COMPLETED (238% achievement). The pipeline & connector configuration suite establishes a resilient, zero-crash AI Verify Moonshot testing environment for enterprise AI models in Telkom Group."
    sop1.font.size = Pt(10)
    sop1.font.color.rgb = TEXT_LIGHT
    sop1.space_before = Pt(4)

    # Output Presentation
    output_path = os.path.join(base_dir, "okr_kr2_report.pptx")
    prs.save(output_path)
    print(f"Presentation saved successfully to {output_path}")

if __name__ == "__main__":
    create_kr2_deck()
