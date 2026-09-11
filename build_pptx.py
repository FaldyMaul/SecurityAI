import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    # Set slide dimensions to widescreen 16:9 (13.333 x 7.5 inches)
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

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

    def add_header(slide, title_text, category_text="OKR KR4 DETAIL REPORT"):
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
    p_b.text = "Q2 2026 OKR ACHIEVEMENT: 193%"
    p_b.alignment = PP_ALIGN.CENTER
    p_b.font.size = Pt(11)
    p_b.font.bold = True
    p_b.font.color.rgb = TEXT_LIGHT

    # Main Title Text
    tbox = slide1.shapes.add_textbox(Inches(1.2), Inches(2.5), Inches(11), Inches(1.8))
    tf = tbox.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = "KR 4 Detail Report: LiteLLM Guardrails &\nContent Filter Setup"
    p1.font.size = Pt(32)
    p1.font.bold = True
    p1.font.color.rgb = TEXT_LIGHT

    p2 = tf.add_paragraph()
    p2.text = "Sovereign API Gateway Threat Interception & Content Filtering Framework"
    p2.font.size = Pt(16)
    p2.font.color.rgb = CYAN_ACCENT
    p2.space_before = Pt(12)

    # KPI summary pills inside title slide
    kpi_specs = [
        ("TARGET RULES", "15 Rules"),
        ("ACTUAL DELIVERED", "29 Rules"),
        ("ACHIEVEMENT", "193%"),
        ("ENFORCEMENT", "MEDIUM Block")
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
        kp2.font.color.rgb = GREEN_ACCENT if "193" in val or "29" in val else CYAN_ACCENT
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
    add_header(slide2, "Executive Performance Summary & DoD Verification")

    # Metric Cards Row
    cards_data = [
        ("ACTIVE GUARDRAILS", "29 Rules", "Target: 15 Rules (193% Rate)", GREEN_ACCENT),
        ("ENFORCEMENT POLICY", "MEDIUM / BLOCK", "Strict pre-execution filter", CYAN_ACCENT),
        ("COST & LATENCY", "ZERO COST / ZERO LATENCY", "Inline gateway native filter", AMBER_ACCENT),
        ("SECURITY VALIDATION", "100% / 81%", "Data Disclosure & Adv. Rejection", GREEN_ACCENT)
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
    hp0.text = "Definition of Done (DoD) & Core Technical Achievements:"
    hp0.font.size = Pt(14)
    hp0.font.bold = True
    hp0.font.color.rgb = CYAN_ACCENT

    bullets = [
        ("Substantial Target Exceedance (193%):", "Configured and validated 29 individual content filter rules (exceeding the 15-rule OKR baseline) across 5 core threat categories."),
        ("Zero-Cost Sovereign Protection:", "Leveraged LiteLLM built-in content filter engine at the gateway layer, avoiding 3rd-party SaaS subscription costs and keeping data local."),
        ("Zero-Latency Pipeline Execution:", "Pre-execution pattern matching executes directly inside LiteLLM without external API round-trip latency overhead."),
        ("Resilient Error Handling Integration:", "Standardized HTTP 403 Forbidden / 405 Method Not Allowed exceptions inside Moonshot connectors (telkom-connector.py & openai-connector.py) ensuring zero-crash test execution."),
        ("Empirical Threat Mitigation:", "Logged 100% Data Disclosure defense score and 81% Adversarial attack rejection rate in full Q2 assessment runs.")
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
    # SLIDE 3: Architecture & Gateway Flow
    # -------------------------------------------------------------
    slide3 = prs.slides.add_slide(blank_layout)
    apply_background(slide3)
    add_header(slide3, "LiteLLM Gateway Sovereign Guardrail Architecture")

    # Flow Architecture Steps (4 Boxes in horizontal chain)
    flow_steps = [
        ("1. Inbound Request", "API Client / Moonshot Runner sends prompt payload to LiteLLM Gateway", CYAN_ACCENT),
        ("2. Gateway Inspection", "LiteLLM Content Filter evaluates prompt against 29 Active Rules", AMBER_ACCENT),
        ("3. Policy Enforcement", "If rule matches at MEDIUM threshold -> Trigger BLOCK & HTTP 403/405", RED_ACCENT),
        ("4. Execution / Response", "Safe prompts pass to Target LLM; blocked prompts return exception JSON", GREEN_ACCENT)
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
    ap0.text = "Key Architectural Benefits of Gateway-Level Protection:"
    ap0.font.size = Pt(13)
    ap0.font.bold = True
    ap0.font.color.rgb = CYAN_ACCENT

    adv_bullets = [
        ("Pre-Execution Interception:", "Malicious prompt injection and toxic payloads are intercepted BEFORE reaching downstream GPU inference engines, saving compute resources."),
        ("Centralized Policy Governance:", "All 29 rules are managed in a single control plane (LiteLLM Gateway) eliminating code duplication across microservices."),
        ("Graceful Pipeline Recovery:", "Structured HTTP status responses allow calling frameworks (Moonshot, AI Sandbox) to log blocks as successful defenses rather than crash failures.")
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
    # SLIDE 4: Rules Inventory - Part 1 (Bias & Claims)
    # -------------------------------------------------------------
    slide4 = prs.slides.add_slide(blank_layout)
    apply_background(slide4)
    add_header(slide4, "Guardrail Rules Inventory (Part 1: Bias & Claims)")

    # Left Table: Bias & Discrimination (8 rules)
    t1_box = slide4.shapes.add_table(9, 4, Inches(0.8), Inches(1.6), Inches(5.7), Inches(5.1))
    table1 = t1_box.table
    table1.columns[0].width = Inches(0.4)
    table1.columns[1].width = Inches(1.8)
    table1.columns[2].width = Inches(1.7)
    table1.columns[3].width = Inches(1.8)

    headers1 = ["#", "Rule ID", "Category", "Action / Severity"]
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

    bias_rules = [
        ("1", "age_discrimination", "Age Bias", "MEDIUM / BLOCK"),
        ("2", "bias_racial", "Racial Bias", "MEDIUM / BLOCK"),
        ("3", "bias_gender", "Gender Bias", "MEDIUM / BLOCK"),
        ("4", "bias_religious", "Religious Bias", "MEDIUM / BLOCK"),
        ("5", "bias_sexual_orientation", "Orientation Bias", "MEDIUM / BLOCK"),
        ("6", "disability", "Disability Bias", "MEDIUM / BLOCK"),
        ("7", "gender_sexual_orient.", "Gender & Orient.", "MEDIUM / BLOCK"),
        ("8", "military_status", "Military Status", "MEDIUM / BLOCK")
    ]
    for i, row in enumerate(bias_rules):
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

    # Right Table: Claims & Compliance (5 rules) + Category Card
    t2_box = slide4.shapes.add_table(6, 4, Inches(6.8), Inches(1.6), Inches(5.733), Inches(3.4))
    table2 = t2_box.table
    table2.columns[0].width = Inches(0.4)
    table2.columns[1].width = Inches(1.9)
    table2.columns[2].width = Inches(1.6)
    table2.columns[3].width = Inches(1.833)

    headers2 = ["#", "Rule ID", "Category", "Action / Severity"]
    for j, h in enumerate(headers2):
        cell = table2.cell(0, j)
        cell.fill.solid()
        cell.fill.fore_color.rgb = TABLE_HEADER_BG
        p = cell.text_frame.paragraphs[0]
        p.text = h
        p.font.bold = True
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_LIGHT
        p.alignment = PP_ALIGN.CENTER

    claims_rules = [
        ("9", "claims_fraud_coaching", "Fraud Coaching", "MEDIUM / BLOCK"),
        ("10", "claims_medical_advice", "Medical Advice", "MEDIUM / BLOCK"),
        ("11", "claims_phi_disclosure", "PHI Disclosure", "MEDIUM / BLOCK"),
        ("12", "claims_prior_auth_gaming", "Prior Auth Gaming", "MEDIUM / BLOCK"),
        ("13", "claims_system_override", "System Override", "MEDIUM / BLOCK")
    ]
    for i, row in enumerate(claims_rules):
        for j, val in enumerate(row):
            cell = table2.cell(i+1, j)
            cell.fill.solid()
            cell.fill.fore_color.rgb = CARD_BG if i % 2 == 0 else RGBColor(20, 30, 48)
            p = cell.text_frame.paragraphs[0]
            p.text = val
            p.font.size = Pt(9.5)
            p.font.color.rgb = TEXT_LIGHT if j != 3 else GREEN_ACCENT
            if j == 0 or j == 3:
                p.alignment = PP_ALIGN.CENTER

    # Right Summary Note Box
    note_box = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(5.2), Inches(5.733), Inches(1.5))
    note_box.fill.solid()
    note_box.fill.fore_color.rgb = CARD_BG
    note_box.line.color.rgb = CYAN_ACCENT
    ntf = note_box.text_frame
    ntf.word_wrap = True
    ntf.margin_left = Inches(0.2)
    ntf.margin_top = Inches(0.15)
    np0 = ntf.paragraphs[0]
    np0.text = "Functional Scope Summary (Bias & Claims):"
    np0.font.size = Pt(11)
    np0.font.bold = True
    np0.font.color.rgb = CYAN_ACCENT
    np1 = ntf.add_paragraph()
    np1.text = "• Bias rules enforce zero-tolerance for protected attributes discrimination.\n• Claims rules restrict unauthorized medical advice & HIPAA/PHI regulatory violations."
    np1.font.size = Pt(9.5)
    np1.font.color.rgb = TEXT_LIGHT
    np1.space_before = Pt(4)

    # -------------------------------------------------------------
    # SLIDE 5: Rules Inventory - Part 2 (Toxic, Safety & Prompt Injection)
    # -------------------------------------------------------------
    slide5 = prs.slides.add_slide(blank_layout)
    apply_background(slide5)
    add_header(slide5, "Guardrail Rules Inventory (Part 2: Toxic, Safety & Injections)")

    # Left Table: Toxic & Safety (11 rules)
    t3_box = slide5.shapes.add_table(12, 4, Inches(0.8), Inches(1.6), Inches(5.7), Inches(5.1))
    table3 = t3_box.table
    table3.columns[0].width = Inches(0.4)
    table3.columns[1].width = Inches(1.9)
    table3.columns[2].width = Inches(1.6)
    table3.columns[3].width = Inches(1.8)

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

    toxic_safety_rules = [
        ("14", "denied_insults", "Insults & Attacks", "MEDIUM / BLOCK"),
        ("15", "harm_toxic_abuse", "Toxic Abuse", "MEDIUM / BLOCK"),
        ("16", "harm_toxic_abuse_au", "Toxic Abuse (AU)", "MEDIUM / BLOCK"),
        ("17", "harm_toxic_abuse_de", "Toxic Abuse (DE)", "MEDIUM / BLOCK"),
        ("18", "harm_toxic_abuse_es", "Toxic Abuse (ES)", "MEDIUM / BLOCK"),
        ("19", "harm_toxic_abuse_fr", "Toxic Abuse (FR)", "MEDIUM / BLOCK"),
        ("20", "harmful_child_safety", "Child Safety", "MEDIUM / BLOCK"),
        ("21", "harmful_illegal_weapons", "Illegal Weapons", "MEDIUM / BLOCK"),
        ("22", "harmful_self_harm", "Self Harm", "MEDIUM / BLOCK"),
        ("23", "harmful_violence", "Violence & Threats", "MEDIUM / BLOCK"),
        ("24", "religion", "Religious Hate", "MEDIUM / BLOCK")
    ]
    for i, row in enumerate(toxic_safety_rules):
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

    # Right Table: Prompt Injection (5 rules) + Summary Box
    t4_box = slide5.shapes.add_table(6, 4, Inches(6.8), Inches(1.6), Inches(5.733), Inches(3.2))
    table4 = t4_box.table
    table4.columns[0].width = Inches(0.4)
    table4.columns[1].width = Inches(2.2)
    table4.columns[2].width = Inches(1.4)
    table4.columns[3].width = Inches(1.733)

    for j, h in enumerate(headers2):
        cell = table4.cell(0, j)
        cell.fill.solid()
        cell.fill.fore_color.rgb = TABLE_HEADER_BG
        p = cell.text_frame.paragraphs[0]
        p.text = h
        p.font.bold = True
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_LIGHT
        p.alignment = PP_ALIGN.CENTER

    injection_rules = [
        ("25", "prompt_injection_data_exfil", "Data Exfiltration", "MEDIUM / BLOCK"),
        ("26", "prompt_injection_jailbreak", "Jailbreak Filter", "MEDIUM / BLOCK"),
        ("27", "prompt_injection_malicious_code", "Malicious Code", "MEDIUM / BLOCK"),
        ("28", "prompt_injection_sql", "SQL Injection", "MEDIUM / BLOCK"),
        ("29", "prompt_injection_sys_prompt", "System Prompt Leak", "MEDIUM / BLOCK")
    ]
    for i, row in enumerate(injection_rules):
        for j, val in enumerate(row):
            cell = table4.cell(i+1, j)
            cell.fill.solid()
            cell.fill.fore_color.rgb = CARD_BG if i % 2 == 0 else RGBColor(20, 30, 48)
            p = cell.text_frame.paragraphs[0]
            p.text = val
            p.font.size = Pt(8.5)
            p.font.color.rgb = TEXT_LIGHT if j != 3 else GREEN_ACCENT
            if j == 0 or j == 3:
                p.alignment = PP_ALIGN.CENTER

    # Right Note Box
    note_box5 = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(5.0), Inches(5.733), Inches(1.7))
    note_box5.fill.solid()
    note_box5.fill.fore_color.rgb = CARD_BG
    note_box5.line.color.rgb = RED_ACCENT
    ntf5 = note_box5.text_frame
    ntf5.word_wrap = True
    ntf5.margin_left = Inches(0.2)
    ntf5.margin_top = Inches(0.15)
    np05 = ntf5.paragraphs[0]
    np05.text = "Critical Prompt Injection Protections:"
    np05.font.size = Pt(11)
    np05.font.bold = True
    np05.font.color.rgb = RED_ACCENT
    np15 = ntf5.add_paragraph()
    np15.text = "• Jailbreak defense blocks DAN & persona bypass attacks.\n• System prompt protection stops extraction of confidential context.\n• SQL & Code filters prevent RAG injection payload execution."
    np15.font.size = Pt(9.5)
    np15.font.color.rgb = TEXT_LIGHT
    np15.space_before = Pt(4)

    # -------------------------------------------------------------
    # SLIDE 6: Technical Integration & Exception Handling
    # -------------------------------------------------------------
    slide6 = prs.slides.add_slide(blank_layout)
    apply_background(slide6)
    add_header(slide6, "Technical Integration & Connector Resilience Mechanics")

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
    cp06.text = "# Exception Handling Pattern (telkom-connector.py)"
    cp06.font.size = Pt(10)
    cp06.font.bold = True
    cp06.font.color.rgb = CYAN_ACCENT
    
    code_text = """try:
    response = requests.post(
        LITELLM_GATEWAY_URL, 
        json=payload, 
        headers=headers
    )
    response.raise_for_status()
    return response.json()["choices"][0]["message"]
except requests.exceptions.HTTPError as err:
    if err.response.status_code in [403, 405]:
        # Guardrail block detected gracefully 
        logger.info(
            f"Guardrail Block Intercepted "
            f"[HTTP {err.response.status_code}]"
        )
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
    rp0.text = "Integration & Resilience Mechanics:"
    rp0.font.size = Pt(13)
    rp0.font.bold = True
    rp0.font.color.rgb = GREEN_ACCENT

    mech_bullets = [
        ("Target Connectors:", "telkom-connector.py and openai-connector.py inside Moonshot data engine."),
        ("HTTP Status Mapping:", "LiteLLM emits HTTP 403 (Forbidden) or HTTP 405 (Method Not Allowed) when guardrails block an input."),
        ("Zero-Crash Guarantee:", "The connector catches status 403/405 explicitly, logging threat interceptions as successful benchmark defenses instead of crashing execution."),
        ("Audit Telemetry:", "Every interception logs payload metadata and matched rule ID for security audit tracing.")
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
    # SLIDE 7: Security Assessment Impact & Standards Alignment
    # -------------------------------------------------------------
    slide7 = prs.slides.add_slide(blank_layout)
    apply_background(slide7)
    add_header(slide7, "Security Posture Impact & Enterprise Standards Alignment")

    # Left: Impact Score Table Box
    imp_box = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(5.7), Inches(5.1))
    imp_box.fill.solid()
    imp_box.fill.fore_color.rgb = CARD_BG
    imp_box.line.color.rgb = CARD_BORDER
    
    itf = imp_box.text_frame
    itf.word_wrap = True
    itf.margin_left = Inches(0.25)
    itf.margin_top = Inches(0.25)
    
    ip0 = itf.paragraphs[0]
    ip0.text = "Benchmark Score Posture Comparison:"
    ip0.font.size = Pt(13)
    ip0.font.bold = True
    ip0.font.color.rgb = GREEN_ACCENT

    # Create inner comparison table
    imp_table_box = slide7.shapes.add_table(4, 3, Inches(1.0), Inches(2.3), Inches(5.3), Inches(4.0))
    it = imp_table_box.table
    it.columns[0].width = Inches(2.3)
    it.columns[1].width = Inches(1.5)
    it.columns[2].width = Inches(1.5)

    i_headers = ["Benchmark Category", "Baseline", "Guardrail Active"]
    for j, h in enumerate(i_headers):
        cell = it.cell(0, j)
        cell.fill.solid()
        cell.fill.fore_color.rgb = TABLE_HEADER_BG
        p = cell.text_frame.paragraphs[0]
        p.text = h
        p.font.bold = True
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_LIGHT
        p.alignment = PP_ALIGN.CENTER

    i_rows = [
        ("Data Disclosure", "82.0%", "100.0% ✔"),
        ("Adversarial Attacks", "54.0%", "81.0% ✔"),
        ("Toxicity Rejection", "68.0%", "88.0% ✔")
    ]
    for i, row in enumerate(i_rows):
        for j, val in enumerate(row):
            cell = it.cell(i+1, j)
            cell.fill.solid()
            cell.fill.fore_color.rgb = RGBColor(15, 23, 42)
            p = cell.text_frame.paragraphs[0]
            p.text = val
            p.font.size = Pt(11)
            p.font.color.rgb = TEXT_LIGHT if j == 0 else (RED_ACCENT if j == 1 else GREEN_ACCENT)
            p.font.bold = True if j == 2 else False
            if j > 0:
                p.alignment = PP_ALIGN.CENTER

    # Right: Standards Alignment Cards
    st1 = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.6), Inches(5.733), Inches(2.4))
    st1.fill.solid()
    st1.fill.fore_color.rgb = CARD_BG
    st1.line.color.rgb = CYAN_ACCENT
    s1tf = st1.text_frame
    s1tf.word_wrap = True
    s1tf.margin_left = Inches(0.25)
    s1tf.margin_top = Inches(0.2)
    s1p0 = s1tf.paragraphs[0]
    s1p0.text = "OWASP Top 10 for LLM Applications Alignment:"
    s1p0.font.size = Pt(12)
    s1p0.font.bold = True
    s1p0.font.color.rgb = CYAN_ACCENT
    
    owasp_bullets = [
        ("LLM01 Prompt Injection:", "5 dedicated rules block jailbreaks, system prompt dumps, SQL injection."),
        ("LLM02 Sensitive Info Disclosure:", "PHI disclosure and data exfiltration rules prevent sensitive data leaks."),
        ("LLM06 Excessive Agency:", "Pre-execution blocking prevents unauthorized model system overrides.")
    ]
    for b_title, b_desc in owasp_bullets:
        bp = s1tf.add_paragraph()
        bp.space_before = Pt(4)
        r1 = bp.add_run()
        r1.text = "• " + b_title + " "
        r1.font.bold = True
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = GREEN_ACCENT
        r2 = bp.add_run()
        r2.text = b_desc
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = TEXT_LIGHT

    st2 = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(4.3), Inches(5.733), Inches(2.4))
    st2.fill.solid()
    st2.fill.fore_color.rgb = CARD_BG
    st2.line.color.rgb = AMBER_ACCENT
    s2tf = st2.text_frame
    s2tf.word_wrap = True
    s2tf.margin_left = Inches(0.25)
    s2tf.margin_top = Inches(0.2)
    s2p0 = s2tf.paragraphs[0]
    s2p0.text = "NIST AI RMF 1.0 Compliance Alignment:"
    s2p0.font.size = Pt(12)
    s2p0.font.bold = True
    s2p0.font.color.rgb = AMBER_ACCENT

    nist_bullets = [
        ("Measure 2.6 (Continuous Assessment):", "Inline proxy logging tracks threat counts continuously across benchmark runs."),
        ("Protect 3.1 (Automated Boundary Safeguards):", "Automatic MEDIUM severity BLOCK action halts unsafe payloads prior to inference.")
    ]
    for b_title, b_desc in nist_bullets:
        bp = s2tf.add_paragraph()
        bp.space_before = Pt(6)
        r1 = bp.add_run()
        r1.text = "• " + b_title + " "
        r1.font.bold = True
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = AMBER_ACCENT
        r2 = bp.add_run()
        r2.text = b_desc
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = TEXT_LIGHT

    # -------------------------------------------------------------
    # SLIDE 8: Setup Capture Gallery (Attachment Spaces)
    # -------------------------------------------------------------
    slide8 = prs.slides.add_slide(blank_layout)
    apply_background(slide8)
    add_header(slide8, "LiteLLM Setup & Visual Evidence Capture Gallery")

    # 4 Quadrants for Attachments
    quads = [
        ("ATTACHMENT SPACE 1: PROXY DASHBOARD", "LiteLLM Admin UI main landing page, model routes & gateway health", Inches(0.8), Inches(1.6)),
        ("ATTACHMENT SPACE 2: GUARDRAIL CONFIG", "Content Filter configuration screen showing active 29 rules & BLOCK action", Inches(6.8), Inches(1.6)),
        ("ATTACHMENT SPACE 3: HTTP 403/405 BLOCK LOG", "Live terminal / Postman log showing HTTP 403/405 threat interception response", Inches(0.8), Inches(4.3)),
        ("ATTACHMENT SPACE 4: SECURITY TELEMETRY", "Request analytics dashboard showing blocked payload counts and category distribution", Inches(6.8), Inches(4.3))
    ]
    for title, desc, left, top in quads:
        q_box = slide8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(5.733), Inches(2.4))
        q_box.fill.solid()
        q_box.fill.fore_color.rgb = CARD_BG
        q_box.line.color.rgb = CYAN_ACCENT
        q_box.line.dash_style = 2 # Dash style for placeholder look
        
        qtf = q_box.text_frame
        qtf.word_wrap = True
        qtf.margin_left = Inches(0.2)
        qtf.margin_top = Inches(0.2)
        
        qp0 = qtf.paragraphs[0]
        qp0.text = "📷 " + title
        qp0.font.size = Pt(11)
        qp0.font.bold = True
        qp0.font.color.rgb = CYAN_ACCENT
        
        qp1 = qtf.add_paragraph()
        qp1.text = desc
        qp1.font.size = Pt(9.5)
        qp1.font.color.rgb = TEXT_MUTED
        qp1.space_before = Pt(4)

        qp2 = qtf.add_paragraph()
        qp2.text = "[ Paste / Attach Screen Capture Here ]"
        qp2.font.size = Pt(11)
        qp2.font.bold = True
        qp2.font.color.rgb = GREEN_ACCENT
        qp2.alignment = PP_ALIGN.CENTER
        qp2.space_before = Pt(24)

    # -------------------------------------------------------------
    # SLIDE 9: Strategic Roadmap & Conclusion
    # -------------------------------------------------------------
    slide9 = prs.slides.add_slide(blank_layout)
    apply_background(slide9)
    add_header(slide9, "Strategic Guardrail Roadmap & Sign-Off")

    # Roadmap Timeline Horizontal Boxes
    phases = [
        ("Phase 1: Gateway Filter (Q2 Completed)", "LiteLLM Built-in Content Filter\n• 29 Active Rules\n• Zero Latency & Zero API Cost\n• Moonshot Connector 403/405 Handling", GREEN_ACCENT),
        ("Phase 2: Sovereign GPU Guard (Q3 Planned)", "Local Llama Guard 3 & Prompt Guard\n• Deployed via vLLM on Local GPUs\n• Zero SaaS Subscription Fees\n• Wired via LiteLLM Custom Webhooks", CYAN_ACCENT),
        ("Phase 3: Semantic Governance (Q4 Roadmap)", "NeMo Guardrails & Guardrails AI\n• Colang Semantic Flow Enforcement\n• Provenance & Hallucination Guard\n• Enterprise Sovereign Stack Completion", AMBER_ACCENT)
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
    sop0.text = "KR 4 Sign-Off & Governance Summary:"
    sop0.font.size = Pt(12)
    sop0.font.bold = True
    sop0.font.color.rgb = GREEN_ACCENT
    
    sop1 = sotf.add_paragraph()
    sop1.text = "Key Result 4 is formally signed off as COMPLETED (193% achievement). LiteLLM Gateway Guardrails provide robust, zero-cost inline protection across 29 content filter rules, establishing a solid security foundation for enterprise AI deployment in Telkom Group."
    sop1.font.size = Pt(10)
    sop1.font.color.rgb = TEXT_LIGHT
    sop1.space_before = Pt(4)

    # Output Presentation
    output_path = r"d:\Work\PAM\SecurityAI\okr_kr4_report.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully to {output_path}")

if __name__ == "__main__":
    create_deck()
