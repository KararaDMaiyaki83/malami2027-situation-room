import os
import shutil
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

PPTX_OUTPUT = "public/Kebbi_2027_Malami_ADC_Situation_Room_Presentation.pptx"
ARTIFACT_OUTPUT = "/Users/user/.gemini/antigravity/brain/9cea947f-a40e-4345-9ec1-86b2feb2e4e5/Kebbi_2027_Malami_ADC_Situation_Room_Presentation.pptx"

# Initialize presentation with 16:9 widescreen dimensions
prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

# Color Palette
BG_DARK = RGBColor(10, 15, 29)          # Deep slate navy (#0A0F1D)
CARD_BG = RGBColor(15, 23, 42)          # Slate-900 (#0F172A)
CARD_BORDER = RGBColor(51, 65, 85)      # Slate-700 (#334155)
EMERALD_ACCENT = RGBColor(16, 185, 129) # Emerald-500 (#10B981)
EMERALD_BG = RGBColor(6, 78, 59)        # Emerald-900 (#064E3B)
AMBER_ACCENT = RGBColor(245, 158, 11)   # Amber-500 (#F59E0B)
SKY_ACCENT = RGBColor(56, 189, 248)     # Sky-400 (#38BDF8)
ROSE_ACCENT = RGBColor(244, 63, 94)     # Rose-500 (#F43F5E)
TEXT_WHITE = RGBColor(255, 255, 255)
TEXT_MUTED = RGBColor(148, 163, 184)    # Slate-400 (#94A3B8)
TEXT_LIGHT = RGBColor(203, 213, 225)    # Slate-300 (#CBD5E1)

blank_layout = prs.slide_layouts[6]

def set_slide_background(slide):
    # Add dark background covering whole slide
    bg_shape = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5)
    )
    bg_shape.fill.solid()
    bg_shape.fill.fore_color.rgb = BG_DARK
    bg_shape.line.fill.background()
    return bg_shape

def add_header(slide, tag_text, title_text, subtitle_text, tag_color=EMERALD_ACCENT, tag_bg=EMERALD_BG):
    # Category Pill / Tag
    tag_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.5), Inches(4.5), Inches(0.42))
    tag_box.fill.solid()
    tag_box.fill.fore_color.rgb = tag_bg
    tag_box.line.color.rgb = tag_color
    tag_box.line.width = Pt(1.5)
    tf_tag = tag_box.text_frame
    tf_tag.word_wrap = True
    tf_tag.margin_left = Inches(0.1)
    tf_tag.margin_right = Inches(0.1)
    tf_tag.margin_top = Inches(0.05)
    tf_tag.margin_bottom = Inches(0.05)
    p_tag = tf_tag.paragraphs[0]
    p_tag.alignment = PP_ALIGN.CENTER
    r_tag = p_tag.add_run()
    r_tag.text = tag_text
    r_tag.font.bold = True
    r_tag.font.size = Pt(11)
    r_tag.font.color.rgb = tag_color

    # Main Title
    title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.95), Inches(11.733), Inches(0.65))
    tf_title = title_box.text_frame
    tf_title.word_wrap = True
    tf_title.margin_left = Inches(0)
    tf_title.margin_right = Inches(0)
    tf_title.margin_top = Inches(0)
    p_title = tf_title.paragraphs[0]
    r_title = p_title.add_run()
    r_title.text = title_text
    r_title.font.bold = True
    r_title.font.size = Pt(22)
    r_title.font.color.rgb = TEXT_WHITE

    # Subtitle
    sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.6), Inches(11.733), Inches(0.45))
    tf_sub = sub_box.text_frame
    tf_sub.word_wrap = True
    tf_sub.margin_left = Inches(0)
    tf_sub.margin_right = Inches(0)
    tf_sub.margin_top = Inches(0)
    p_sub = tf_sub.paragraphs[0]
    r_sub = p_sub.add_run()
    r_sub.text = subtitle_text
    r_sub.font.size = Pt(12)
    r_sub.font.color.rgb = TEXT_MUTED

def add_footer(slide, slide_num, total_slides=8):
    footer_box = slide.shapes.add_textbox(Inches(0.8), Inches(6.85), Inches(11.733), Inches(0.4))
    tf = footer_box.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0)
    tf.margin_top = Inches(0)
    p = tf.paragraphs[0]
    
    r1 = p.add_run()
    r1.text = "Abubakar Malami (SAN) Situation Room • Official Platform by Technical Team • Powered by GetoCore & TEEM TECH (Kaduna #1 IT) | IT: Fatima Sulaiman Umar (08035533332 / 09035328748)"
    r1.font.size = Pt(9.5)
    r1.font.color.rgb = RGBColor(100, 116, 139)
    
    r2 = p.add_run()
    r2.text = f"   |   Slide {slide_num} of {total_slides}"
    r2.font.bold = True
    r2.font.size = Pt(10)
    r2.font.color.rgb = EMERALD_ACCENT

def add_card(slide, left, top, width, height, title, items, border_color=CARD_BORDER, title_color=TEXT_WHITE, fill_color=CARD_BG, title_size=15, item_size=11):
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
    card.fill.solid()
    card.fill.fore_color.rgb = fill_color
    card.line.color.rgb = border_color
    card.line.width = Pt(1.5)

    tf = card.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.25)
    tf.margin_right = Inches(0.25)
    tf.margin_top = Inches(0.2)
    tf.margin_bottom = Inches(0.2)

    # Title
    p_title = tf.paragraphs[0]
    p_title.space_after = Pt(8)
    r_title = p_title.add_run()
    r_title.text = title
    r_title.font.bold = True
    r_title.font.size = Pt(title_size)
    r_title.font.color.rgb = title_color

    # Bullet items
    for item in items:
        p_item = tf.add_paragraph()
        p_item.space_before = Pt(4)
        p_item.space_after = Pt(2)
        r_bullet = p_item.add_run()
        r_bullet.text = "• "
        r_bullet.font.bold = True
        r_bullet.font.size = Pt(item_size)
        r_bullet.font.color.rgb = border_color
        
        r_text = p_item.add_run()
        r_text.text = item
        r_text.font.size = Pt(item_size)
        r_text.font.color.rgb = TEXT_LIGHT

# ==============================================================================
# SLIDE 1: COVER PAGE
# ==============================================================================
s1 = prs.slides.add_slide(blank_layout)
set_slide_background(s1)

# Hero Frame
hero = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.2), Inches(1.0), Inches(10.933), Inches(5.5))
hero.fill.solid()
hero.fill.fore_color.rgb = CARD_BG
hero.line.color.rgb = EMERALD_ACCENT
hero.line.width = Pt(2.5)

tf_h = hero.text_frame
tf_h.word_wrap = True
tf_h.margin_left = Inches(0.6)
tf_h.margin_right = Inches(0.6)
tf_h.margin_top = Inches(0.4)
tf_h.margin_bottom = Inches(0.4)

p0 = tf_h.paragraphs[0]
p0.alignment = PP_ALIGN.CENTER
p0.space_after = Pt(8)
r0 = p0.add_run()
r0.text = "AFRICAN DEMOCRATIC CONGRESS (ADC) • KEBBI 2027 GUBERNATORIAL PROJECT"
r0.font.bold = True
r0.font.size = Pt(13)
r0.font.color.rgb = EMERALD_ACCENT

p1 = tf_h.add_paragraph()
p1.alignment = PP_ALIGN.CENTER
p1.space_before = Pt(6)
p1.space_after = Pt(4)
r1 = p1.add_run()
r1.text = "ABUBAKAR MALAMI (SAN) ELECTION 2027 SITUATION ROOM"
r1.font.bold = True
r1.font.size = Pt(28)
r1.font.color.rgb = TEXT_WHITE

p2 = tf_h.add_paragraph()
p2.alignment = PP_ALIGN.CENTER
p2.space_after = Pt(18)
r2 = p2.add_run()
r2.text = "Official Parallel Vote Tabulation (PVT) & Statewide Electoral Defense Command"
r2.font.bold = True
r2.font.size = Pt(16)
r2.font.color.rgb = AMBER_ACCENT

p3 = tf_h.add_paragraph()
p3.alignment = PP_ALIGN.CENTER
p3.space_before = Pt(10)
r3 = p3.add_run()
r3.text = "PREPARED FOR: ABUBAKAR MALAMI, SAN, CON"
r3.font.bold = True
r3.font.size = Pt(15)
r3.font.color.rgb = TEXT_WHITE

p4 = tf_h.add_paragraph()
p4.alignment = PP_ALIGN.CENTER
p4.space_after = Pt(14)
r4 = p4.add_run()
r4.text = "Former Attorney-General of the Federation & Minister of Justice | ADC Gubernatorial Candidate"
r4.font.size = Pt(12)
r4.font.color.rgb = TEXT_MUTED

p5 = tf_h.add_paragraph()
p5.alignment = PP_ALIGN.CENTER
p5.space_before = Pt(10)
r5 = p5.add_run()
r5.text = "Official Platform by the Technical Team"
r5.font.bold = True
r5.font.size = Pt(12.5)
r5.font.color.rgb = EMERALD_ACCENT

p6 = tf_h.add_paragraph()
p6.alignment = PP_ALIGN.CENTER
p6.space_before = Pt(4)
r6 = p6.add_run()
r6.text = "Powered by GetoCore Digital Innovation & TEEM TECH Solution (Kaduna's #1 IT Companies with Election Ideas)"
r6.font.size = Pt(11.5)
r6.font.color.rgb = TEXT_LIGHT

p7 = tf_h.add_paragraph()
p7.alignment = PP_ALIGN.CENTER
p7.space_before = Pt(4)
r7 = p7.add_run()
r7.text = "Lead IT Technical Officer: Fatima Sulaiman Umar (Hotlines: 08035533332 / 09035328748)"
r7.font.bold = True
r7.font.size = Pt(11.5)
r7.font.color.rgb = AMBER_ACCENT

# ==============================================================================
# SLIDE 2: STRATEGIC LESSONS (2023 POST-MORTEM & 2027 ANTIDOTE)
# ==============================================================================
s2 = prs.slides.add_slide(blank_layout)
set_slide_background(s2)
add_header(s2, "SLIDE 2: STRATEGIC LESSONS", "Forensic Audit of 2023 vs. 2027 Winning Blueprint", "How APC won via Section 51 manipulation and our ironclad mathematical antidote", ROSE_ACCENT, RGBColor(76, 5, 25))
add_footer(s2, 2)

add_card(s2, 0.8, 2.1, 5.7, 4.5, "1. THE 2023 LOSS TRAP (SECTION 51)", [
    "45,000-Vote Lead Trap: In 2023, the leading party had a 45k vote lead but election was declared inconclusive because 91,000 PVCs were cancelled.",
    "Deliberate BVAS Bypasses: Targeted polling units had synthetic over-voting triggered, forcing returning officers to cancel entire wards under Section 51.",
    "Paper Disconnect: Polling unit agents had paper copies with altered figures at RAC collation centres with zero photographic or GPS timestamp proof.",
    "Supplementary Defeat: Once forced into a rerun, the state machinery deployed massive security intimidation and won the fragmented supplemental poll."
], border_color=ROSE_ACCENT, title_color=RGBColor(251, 113, 133), fill_color=RGBColor(24, 18, 30), title_size=15, item_size=11)

add_card(s2, 6.8, 2.1, 5.7, 4.5, "2. THE 2027 MALAMI ANTIDOTE", [
    "Surplus Margin Buffer (+75k Target): Build a lead margin exceeding the statewide ceiling of cancelled PVCs, legally precluding any rerun declaration.",
    "Anti-Over-Voting Early Warning: PU Agent PWA forbids result submission if Total Votes Cast exceeds BVAS Accredited count (Section 51 check).",
    "Dual GPS Watermark: Form EC8A photos are encrypted with coordinates; any upload outside 15m radius is instantly quarantined as tampered.",
    "Instant Tribunal Dossier: Form EC40G protests filed within 30 minutes with cryptographic timestamps admissible under Section 84 Evidence Act."
], border_color=EMERALD_ACCENT, title_color=RGBColor(52, 211, 153), fill_color=RGBColor(6, 40, 30), title_size=15, item_size=11)

# ==============================================================================
# SLIDE 3: 4-TIER OPERATIONAL ARCHITECTURE
# ==============================================================================
s3 = prs.slides.add_slide(blank_layout)
set_slide_background(s3)
add_header(s3, "SLIDE 3: OPERATIONS & DISCIPLINE", "4-Tier Hierarchical Electoral Command Architecture", "Strict role containment ensuring impenetrable command from 3,745 PUs to State Command", SKY_ACCENT, RGBColor(8, 47, 73))
add_footer(s3, 3)

col_w = 2.78
add_card(s3, 0.8, 2.1, col_w, 4.5, "TIER 1: 3,745 PU AGENTS", [
    "6-Stage phaser reporting: PO arrival, BVAS 000 check, queue cutoff at 2:30pm, counting, EC8A photo upload.",
    "Strict single-PU scoping.",
    "Offline local SQLite storage.",
    "100% PU coverage statewide."
], border_color=SKY_ACCENT, title_color=SKY_ACCENT, title_size=13, item_size=10.5)

add_card(s3, 3.78, 2.1, col_w, 4.5, "TIER 2: 225 RA SUPERVISORS", [
    "Ward RAC collation oversight.",
    "Reconciliation of constituent PUs into Form EC8B.",
    "Instant Form EC8B CSV export.",
    "Motorbike rapid escort details."
], border_color=EMERALD_ACCENT, title_color=RGBColor(52, 211, 153), title_size=13, item_size=10.5)

add_card(s3, 6.76, 2.1, col_w, 4.5, "TIER 3: 21 LGA SUPERVISORS", [
    "Assigned Legal Counsel at each INEC Collation Hall.",
    "Form EC8C mathematical audit.",
    "On-site filing of Section 51 protest affidavits to EO.",
    "Fast-response vehicle details."
], border_color=RGBColor(168, 85, 247), title_color=RGBColor(192, 132, 252), title_size=13, item_size=10.5)

add_card(s3, 9.74, 2.1, col_w, 4.5, "TIER 4: STATE COMMAND", [
    "Birnin Kebbi Situation Room.",
    "Full oversight of all 21 LGAs.",
    "Live PVT vs IReV disparity audit.",
    "Sec 179(2) 25% spread tracker.",
    "Direct channel to SAN Malami."
], border_color=AMBER_ACCENT, title_color=AMBER_ACCENT, fill_color=RGBColor(6, 40, 30), title_size=13, item_size=10.5)

# ==============================================================================
# SLIDE 4: TECHNOLOGY ARCHITECTURE (GETOCORE × TEEM TECH) - 100% CLEAN
# ==============================================================================
s4 = prs.slides.add_slide(blank_layout)
set_slide_background(s4)
add_header(s4, "SLIDE 4: TECHNOLOGY ARCHITECTURE", "Proprietary Telemetry Engine (GetoCore × TEEM TECH)", "High-concurrency, offline-capable PWA with zero-plaintext cryptographic security", EMERALD_ACCENT, EMERALD_BG)
add_footer(s4, 4)

col4_w = 3.75
add_card(s4, 0.8, 2.1, col4_w, 4.5, "1. OFFLINE-FIRST PWA ENGINE", [
    "Built with Next.js 14, TypeScript and Service Workers for instant mobile performance.",
    "SAN Malami portrait featured on mobile home screen icon for instant field recognition.",
    "Operates 100% offline in deep rural/riverine LGAs (Sakaba, Danko-Wasagu, Bagudo).",
    "Automated sync: queued results upload automatically upon detecting cellular signal.",
    "Ultra-low battery draw: supports 16+ hours of field operation on a single charge."
], border_color=EMERALD_ACCENT, title_color=RGBColor(52, 211, 153), title_size=14, item_size=10.5)

add_card(s4, 4.75, 2.1, col4_w, 4.5, "2. DUAL GPS & IREV AUDIT", [
    "Dual forensic audit: compares PU agent Form EC8A against public INEC IReV uploads.",
    "Geo-fence radius <= 15m instantly flags illegal remote collation attempts.",
    "Automated high-speed ingestion of IReV endpoints across all 3,745 polling units.",
    "Instant discrepancy alerts with Form EC40G court evidence packet generation.",
    "Admissible electronic exhibits certified under Section 84 of the Nigerian Evidence Act."
], border_color=SKY_ACCENT, title_color=SKY_ACCENT, title_size=14, item_size=10.5)

add_card(s4, 8.7, 2.1, col4_w, 4.5, "3. BILINGUAL AI LEGAL COPILOT", [
    "Intelligent assistant with English and Hausa instant language toggle (EN | HA).",
    "Role-aware: BVAS restart protocols, Section 51 objections, and photo capture guidance.",
    "Encrypted SMS/USSD fallback gateway (500,000 SMS capacity) for zero-data zones.",
    "Toll-free emergency legal dispatch hotline: 0800-ADC-MALAMI.",
    "Direct panic dispatch: notifies LGA litigation counsel and security details in 60s."
], border_color=AMBER_ACCENT, title_color=AMBER_ACCENT, title_size=14, item_size=10.5)

# ==============================================================================
# SLIDE 5: ELECTORAL MATHEMATICS & CONSTITUTIONAL CRITERIA - 100% CLEAN
# ==============================================================================
s5 = prs.slides.add_slide(blank_layout)
set_slide_background(s5)
add_header(s5, "SLIDE 5: ELECTORAL MATHEMATICS", "Section 179(2) Spread & Section 51 Margin Strategy", "Ensuring constitutional spread across 14+ LGAs and insurmountable lead margin", AMBER_ACCENT, RGBColor(69, 26, 3))
add_footer(s5, 5)

add_card(s5, 0.8, 2.1, 5.7, 4.5, "1. SECTION 179(2) CONSTITUTIONAL SPREAD", [
    "Constitutional Threshold: Requires highest number of votes + not less than 25% of votes cast in at least 2/3 of all LGAs (14 of 21 LGAs).",
    "Kebbi Central Tactical Fortress (7/7 LGAs): Overwhelming victory in Birnin Kebbi, Gwandu, Jega, Kalgo, Aliero, Maiyama, Bunza.",
    "Southern Kebbi Coalition (7/7 LGAs): Historic equity alliance delivers Zuru, Danko-Wasagu, Sakaba, Fakai, Yauri, Ngaski, Shanga.",
    "Northern Kebbi Inroads (6/7 LGAs): Strategic border parity in Argungu, Augie, Dandi, Arewa, Suru, Bagudo.",
    "Target Achievement: ADC projects meeting 25%+ in all 21 LGAs, eliminating any legal challenge to geographical spread."
], border_color=EMERALD_ACCENT, title_color=RGBColor(52, 211, 153), title_size=14, item_size=10.5)

add_card(s5, 6.8, 2.1, 5.7, 4.5, "2. SECTION 51 SURPLUS MARGIN SHIELD", [
    "The Margin of Lead Rule: If Margin of Lead < Cancelled PVCs, Returning Officer must declare election INCONCLUSIVE.",
    "Simulated 2027 Projections for Kebbi State:",
    "  • Total ADC Votes: 468,540 (54.5% of total votes cast)",
    "  • Total APC Votes: 341,210 (39.7% of total votes cast)",
    "  • Projected Lead Margin: +127,330 votes",
    "  • Statewide Cancelled PVCs: 52,300 votes",
    "Net Surplus Safety Buffer: +75,030 votes above cancelled PVCs.",
    "Statutory Outcome: Decisive first-ballot declaration of Abubakar Malami SAN without rerun risk!"
], border_color=AMBER_ACCENT, title_color=AMBER_ACCENT, fill_color=RGBColor(6, 40, 30), title_size=14, item_size=10.5)

# ==============================================================================
# SLIDE 6: ROLLOUT ROADMAP & SIMULATION DRILLS
# ==============================================================================
s6 = prs.slides.add_slide(blank_layout)
set_slide_background(s6)
add_header(s6, "SLIDE 6: ROLLOUT ROADMAP", "Statewide Implementation Timeline & Simulation Drills", "Rigorous step-by-step milestones ensuring 100% readiness prior to Election Day", RGBColor(168, 85, 247), RGBColor(59, 7, 100))
add_footer(s6, 6)

add_card(s6, 0.8, 2.1, col4_w, 4.5, "PHASE 1: PROVISIONING (M-2)", [
    "Custom software deployment & stress testing.",
    "Khadimiyya Foundation & ADC ward recruitment.",
    "Printing 4,200 laminated QR-code photo ID badges.",
    "Procurement of 3,745 backup power banks.",
    "Birnin Kebbi Command Centre physical outfitting."
], border_color=SKY_ACCENT, title_color=SKY_ACCENT, title_size=14, item_size=11)

add_card(s6, 4.75, 2.1, col4_w, 4.5, "PHASE 2: SIMULATION (M-1)", [
    "Zonal training workshops (Central, North, South).",
    "Dry-run simulation drill across all 21 LGAs.",
    "Live BVAS zero-reading and mock EC8A upload.",
    "SMS gateway and satellite comms stress test.",
    "Serving legal protocols on INEC REC and security."
], border_color=AMBER_ACCENT, title_color=AMBER_ACCENT, title_size=14, item_size=11)

add_card(s6, 8.7, 2.1, col4_w, 4.5, "PHASE 3: E-DAY EXECUTION", [
    "07:00 AM: Arrival & BVAS 000 verification.",
    "02:30 PM: Queue cutoff enforcement.",
    "04:30 PM: Form EC8A snapping & telemetry push.",
    "08:00 PM: Form EC8B & EC8C live reconciliation.",
    "02:00 AM: Form EC8D State Declaration Defense."
], border_color=EMERALD_ACCENT, title_color=RGBColor(52, 211, 153), fill_color=RGBColor(6, 40, 30), title_size=14, item_size=11)

# ==============================================================================
# SLIDE 7: FINANCIAL IMPLICATIONS (MASTER BUDGET ₦329M)
# ==============================================================================
s7 = prs.slides.add_slide(blank_layout)
set_slide_background(s7)
add_header(s7, "SLIDE 7: FINANCIAL IMPLICATIONS", "Comprehensive Turnkey Budget Breakdown (₦329,000,000)", "Transparent, itemized capital and operational cost structure across 7 cost centers", AMBER_ACCENT, RGBColor(69, 26, 3))
add_footer(s7, 7)

add_card(s7, 0.8, 2.1, 5.7, 4.5, "ITEMIZED COST CENTERS (NGN ₦)", [
    "1. Polling Unit Agent Network (3,745 PUs + 375 Runners): ₦121,725,000 (37.0%)",
    "2. Ward (RA) Supervisors & RAC Collation (225 Wards): ₦23,625,000 (7.2%)",
    "3. LGA Collation & Legal Shield Teams (21 LGAs): ₦14,175,000 (4.3%)",
    "4. Central Situation Room & Command HQ (Birnin Kebbi): ₦37,600,000 (11.4%)",
    "5. Software Engine & Telemetry (GetoCore × TEEM TECH): ₦50,000,000 (15.2%)",
    "6. Field Kits, QR Badges & 3,745 Power Banks: ₦44,082,500 (13.4%)",
    "7. Legal Shield, CTC Procurement & Contingency: ₦37,792,500 (11.5%)",
    "TOTAL MANDATE SECURITY BUDGET: ₦329,000,000 (100.0%)",
    "Unit Metric: Approximately ₦87,850 per Polling Unit for total victory defense."
], border_color=EMERALD_ACCENT, title_color=RGBColor(52, 211, 153), title_size=14, item_size=10.5)

add_card(s7, 6.8, 2.1, 5.7, 4.5, "PHASED 3-TRANCHE DISBURSEMENT", [
    "Tranche 1: Mobilization & Tech Provisioning (40% - ₦131,600,000):",
    "  • Due at contract execution (T - 60 Days).",
    "  • Covers platform customization, cloud infra, power banks, badge printing, Birnin Kebbi Situation Room setup.",
    "",
    "Tranche 2: Field Training & Mock Simulation (35% - ₦115,150,000):",
    "  • Due upon platform readiness (T - 21 Days).",
    "  • Covers training stipends for 3,745 PU agents + 225 RA supervisors, data recharges, 21-LGA mock simulation.",
    "",
    "Tranche 3: D-Day Operations & Legal Vault (25% - ₦82,250,000):",
    "  • Due 5 days before election (T - 5 Days).",
    "  • Covers D-Day honoraria, RAC transport, LGA counsel retainers, 48hr Situation Room ops, CTC legal procurement."
], border_color=RGBColor(129, 140, 248), title_color=RGBColor(199, 210, 254), fill_color=RGBColor(24, 21, 56), title_size=14, item_size=10.5)

# ==============================================================================
# SLIDE 8: GOVERNANCE & STRATEGIC SIGN-OFF
# ==============================================================================
s8 = prs.slides.add_slide(blank_layout)
set_slide_background(s8)
add_header(s8, "SLIDE 8: GOVERNANCE & CALL TO ACTION", "Accountability Controls & Project Commissioning", "Guaranteed auditability, zero waste, and immediate next steps for execution", EMERALD_ACCENT, EMERALD_BG)
add_footer(s8, 8)

add_card(s8, 0.8, 2.1, 5.7, 4.5, "FINANCIAL GOVERNANCE & AUDIT TRAIL", [
    "Biometric / Phone Number Validation: Agent payments disbursed via direct bank transfer tied to verified PVC and accredited PU code. Zero cash leakage.",
    "Milestone-Linked Escrow: Tranches released strictly upon verified delivery of each phase (e.g. 100% badge verification before Tranche 2).",
    "Zero-Waste Protocol: Reusable assets (screens, laptops, Starlink terminals, inverters) remain permanent campaign / foundation property.",
    "Real-Time Expenditure Telemetry: Financial dashboard tracking every disbursement across all 21 Local Government Areas."
], border_color=SKY_ACCENT, title_color=SKY_ACCENT, title_size=14, item_size=11)

add_card(s8, 6.8, 2.1, 5.7, 4.5, "EXECUTIVE SIGN-OFF & COMMISSIONING", [
    "Immediate Next Steps:",
    "  1. Formal approval of the ₦329M Budget and 3-Tranche Schedule.",
    "  2. Commissioning of GetoCore Digital Innovation & TEEM TECH Solution as Lead Electoral Systems Architects.",
    "  3. Establishment of the Birnin Kebbi Situation Room facility lease.",
    "",
    "Lead IT Technical Officer: Fatima Sulaiman Umar",
    "Support Hotlines: 08035533332 / 09035328748",
    "",
    "Confidence Commitment: This architecture guarantees that every vote cast for Abubakar Malami, SAN in all 3,745 PUs is counted, transmitted, and legally defended to the Supreme Court."
], border_color=AMBER_ACCENT, title_color=AMBER_ACCENT, fill_color=RGBColor(6, 40, 30), title_size=14, item_size=10.5)

# Save Presentation
prs.save(PPTX_OUTPUT)
shutil.copy2(PPTX_OUTPUT, ARTIFACT_OUTPUT)

print(f"SUCCESS: Generated native presentation at {PPTX_OUTPUT} ({os.path.getsize(PPTX_OUTPUT)} bytes)")
print(f"SUCCESS: Copied to artifact at {ARTIFACT_OUTPUT}")
