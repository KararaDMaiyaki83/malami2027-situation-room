import os
import shutil
from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, letter
from reportlab.pdfgen import canvas

PDF_OUTPUT = "public/Kebbi_2027_Malami_ADC_Situation_Room_Presentation.pdf"
ARTIFACT_OUTPUT = "/Users/user/.gemini/antigravity/brain/9cea947f-a40e-4345-9ec1-86b2feb2e4e5/Kebbi_2027_Malami_ADC_Situation_Room_Presentation.pdf"

# 16:9 Landscape dimensions (960 x 540 pt)
WIDTH = 960
HEIGHT = 540

c = canvas.Canvas(PDF_OUTPUT, pagesize=(WIDTH, HEIGHT))

# Color palette
C_BG = colors.HexColor("#0A0F1D")
C_CARD_BG = colors.HexColor("#0F172A")
C_CARD_BORDER = colors.HexColor("#334155")
C_EMERALD = colors.HexColor("#10B981")
C_EMERALD_BG = colors.HexColor("#064E3B")
C_AMBER = colors.HexColor("#F59E0B")
C_SKY = colors.HexColor("#38BDF8")
C_ROSE = colors.HexColor("#F43F5E")
C_WHITE = colors.HexColor("#FFFFFF")
C_MUTED = colors.HexColor("#94A3B8")
C_LIGHT = colors.HexColor("#CBD5E1")

def draw_background():
    c.setFillColor(C_BG)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)

def draw_header(tag_text, title_text, subtitle_text, tag_color=C_EMERALD, tag_bg=C_EMERALD_BG):
    # Tag Pill
    c.setFillColor(tag_bg)
    c.setStrokeColor(tag_color)
    c.setLineWidth(1.5)
    c.roundRect(50, HEIGHT - 55, 340, 26, 6, fill=1, stroke=1)
    
    c.setFillColor(tag_color)
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(50 + 170, HEIGHT - 46, tag_text)

    # Title
    c.setFillColor(C_WHITE)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(50, HEIGHT - 85, title_text)

    # Subtitle
    c.setFillColor(C_MUTED)
    c.setFont("Helvetica", 11)
    c.drawString(50, HEIGHT - 105, subtitle_text)

def draw_footer(slide_num, total_slides=8):
    c.setStrokeColor(colors.HexColor("#1E293B"))
    c.setLineWidth(1)
    c.line(50, 42, WIDTH - 50, 42)

    c.setFillColor(C_MUTED)
    c.setFont("Helvetica", 8.5)
    c.drawString(50, 26, "Abubakar Malami (SAN) Situation Room • Official Platform by Technical Team • Powered by GetoCore & TEEM TECH (Kaduna #1 IT) | IT: Fatima Sulaiman Umar (08035533332 / 09035328748)")

    c.setFillColor(C_EMERALD)
    c.setFont("Helvetica-Bold", 9)
    c.drawRightString(WIDTH - 50, 26, f"Slide {slide_num} of {total_slides}")

def draw_card(x, y, w, h, title, items, border_color=C_CARD_BORDER, title_color=C_WHITE, fill_color=C_CARD_BG, title_size=12, item_size=9.5):
    c.setFillColor(fill_color)
    c.setStrokeColor(border_color)
    c.setLineWidth(1.2)
    c.roundRect(x, y, w, h, 8, fill=1, stroke=1)

    # Title
    c.setFillColor(title_color)
    c.setFont("Helvetica-Bold", title_size)
    c.drawString(x + 18, y + h - 26, title)

    # Items
    curr_y = y + h - 48
    c.setFont("Helvetica", item_size)
    
    for item in items:
        if not item.strip():
            curr_y -= 8
            continue
        c.setFillColor(border_color)
        c.drawString(x + 18, curr_y, "•")
        c.setFillColor(C_LIGHT)
        
        # Word wrap text if long
        words = item.split()
        line = ""
        max_chars = int((w - 45) / (item_size * 0.52))
        
        for word in words:
            if len(line + " " + word) < max_chars:
                line = (line + " " + word).strip()
            else:
                c.drawString(x + 30, curr_y, line)
                curr_y -= (item_size + 4)
                line = word
        if line:
            c.drawString(x + 30, curr_y, line)
            curr_y -= (item_size + 6)

# ==============================================================================
# SLIDE 1: COVER
# ==============================================================================
draw_background()

c.setFillColor(C_CARD_BG)
c.setStrokeColor(C_EMERALD)
c.setLineWidth(2.5)
c.roundRect(60, 50, WIDTH - 120, HEIGHT - 100, 12, fill=1, stroke=1)

c.setFillColor(C_EMERALD)
c.setFont("Helvetica-Bold", 12)
c.drawCentredString(WIDTH / 2, HEIGHT - 120, "AFRICAN DEMOCRATIC CONGRESS (ADC) • KEBBI 2027 GUBERNATORIAL PROJECT")

c.setFillColor(C_WHITE)
c.setFont("Helvetica-Bold", 26)
c.drawCentredString(WIDTH / 2, HEIGHT - 165, "ABUBAKAR MALAMI (SAN) ELECTION 2027 SITUATION ROOM")

c.setFillColor(C_AMBER)
c.setFont("Helvetica-Bold", 15)
c.drawCentredString(WIDTH / 2, HEIGHT - 200, "Official Parallel Vote Tabulation (PVT) & Statewide Electoral Defense Command")

c.setFillColor(C_WHITE)
c.setFont("Helvetica-Bold", 14)
c.drawCentredString(WIDTH / 2, HEIGHT - 260, "PREPARED FOR: ABUBAKAR MALAMI, SAN, CON")

c.setFillColor(C_MUTED)
c.setFont("Helvetica", 11)
c.drawCentredString(WIDTH / 2, HEIGHT - 285, "Former Attorney-General of the Federation & Minister of Justice | ADC Gubernatorial Candidate")

c.setFillColor(C_EMERALD)
c.setFont("Helvetica-Bold", 12)
c.drawCentredString(WIDTH / 2, HEIGHT - 340, "Official Platform by the Technical Team")

c.setFillColor(C_LIGHT)
c.setFont("Helvetica", 11)
c.drawCentredString(WIDTH / 2, HEIGHT - 365, "Powered by GetoCore Digital Innovation & TEEM TECH Solution (Kaduna's #1 IT Companies with Election Ideas)")

c.setFillColor(C_AMBER)
c.setFont("Helvetica-Bold", 11.5)
c.drawCentredString(WIDTH / 2, HEIGHT - 395, "Lead IT Technical Officer: Fatima Sulaiman Umar (Hotlines: 08035533332 / 09035328748)")

c.showPage()

# ==============================================================================
# SLIDE 2: STRATEGIC LESSONS
# ==============================================================================
draw_background()
draw_header("SLIDE 2: STRATEGIC LESSONS", "Forensic Audit of 2023 vs. 2027 Winning Blueprint", "How APC won via Section 51 manipulation and our ironclad mathematical antidote", C_ROSE, colors.HexColor("#4C0519"))
draw_footer(2)

card_w = (WIDTH - 130) / 2
draw_card(50, 60, card_w, 360, "1. THE 2023 LOSS TRAP (SECTION 51)", [
    "45,000-Vote Lead Trap: In 2023, the leading party had a 45k vote lead but election was declared inconclusive because 91,000 PVCs were cancelled.",
    "Deliberate BVAS Bypasses: Targeted polling units had synthetic over-voting triggered, forcing returning officers to cancel entire wards under Section 51.",
    "Paper Disconnect: Polling unit agents had paper copies with altered figures at RAC collation centres with zero photographic or GPS timestamp proof.",
    "Supplementary Defeat: Once forced into a rerun, the state machinery deployed massive security intimidation and won the fragmented supplemental poll."
], border_color=C_ROSE, title_color=colors.HexColor("#FB7185"), fill_color=colors.HexColor("#18121E"))

draw_card(50 + card_w + 30, 60, card_w, 360, "2. THE 2027 MALAMI ANTIDOTE", [
    "Surplus Margin Buffer (+75k Target): Build a lead margin exceeding the statewide ceiling of cancelled PVCs, legally precluding any rerun declaration.",
    "Anti-Over-Voting Early Warning: PU Agent PWA forbids result submission if Total Votes Cast exceeds BVAS Accredited count (Section 51 check).",
    "Dual GPS Watermark: Form EC8A photos are encrypted with coordinates; any upload outside 15m radius is instantly quarantined as tampered.",
    "Instant Tribunal Dossier: Form EC40G protests filed within 30 minutes with cryptographic timestamps admissible under Section 84 Evidence Act."
], border_color=C_EMERALD, title_color=colors.HexColor("#34D399"), fill_color=colors.HexColor("#06281E"))

c.showPage()

# ==============================================================================
# SLIDE 3: 4-TIER HIERARCHY
# ==============================================================================
draw_background()
draw_header("SLIDE 3: OPERATIONS & DISCIPLINE", "4-Tier Hierarchical Electoral Command Architecture", "Strict role containment ensuring impenetrable command from 3,745 PUs to State Command", C_SKY, colors.HexColor("#082F49"))
draw_footer(3)

col4_w = (WIDTH - 100 - 3 * 20) / 4
draw_card(50, 60, col4_w, 360, "TIER 1: 3,745 PU AGENTS", [
    "6-Stage phaser reporting: PO arrival, BVAS 000 check, queue cutoff at 2:30pm, counting, EC8A photo upload.",
    "Strict single-PU scoping.",
    "Offline local SQLite storage.",
    "100% PU coverage statewide."
], border_color=C_SKY, title_color=C_SKY, title_size=11, item_size=9)

draw_card(50 + (col4_w + 20), 60, col4_w, 360, "TIER 2: 225 RA SUPERVISORS", [
    "Ward RAC collation oversight.",
    "Reconciliation of constituent PUs into Form EC8B.",
    "Instant Form EC8B CSV export.",
    "Motorbike rapid escort details."
], border_color=C_EMERALD, title_color=colors.HexColor("#34D399"), title_size=11, item_size=9)

draw_card(50 + 2 * (col4_w + 20), 60, col4_w, 360, "TIER 3: 21 LGA SUPERVISORS", [
    "Assigned Legal Counsel at each INEC Collation Hall.",
    "Form EC8C mathematical audit.",
    "On-site filing of Section 51 protest affidavits to EO.",
    "Fast-response vehicle details."
], border_color=colors.HexColor("#A855F7"), title_color=colors.HexColor("#C084FC"), title_size=11, item_size=9)

draw_card(50 + 3 * (col4_w + 20), 60, col4_w, 360, "TIER 4: STATE COMMAND", [
    "Birnin Kebbi Situation Room.",
    "Full oversight of all 21 LGAs.",
    "Live PVT vs IReV disparity audit.",
    "Sec 179(2) 25% spread tracker.",
    "Direct channel to SAN Malami."
], border_color=C_AMBER, title_color=C_AMBER, fill_color=colors.HexColor("#06281E"), title_size=11, item_size=9)

c.showPage()

# ==============================================================================
# SLIDE 4: TECHNOLOGY INFRASTRUCTURE (GETOCORE × TEEM TECH) - PRISTINE & COMPLETE
# ==============================================================================
draw_background()
draw_header("SLIDE 4: TECHNOLOGY ARCHITECTURE", "Proprietary Telemetry Engine (GetoCore × TEEM TECH)", "High-concurrency, offline-capable PWA with zero-plaintext cryptographic security", C_EMERALD, C_EMERALD_BG)
draw_footer(4)

col3_w = (WIDTH - 100 - 2 * 25) / 3
draw_card(50, 60, col3_w, 360, "1. OFFLINE-FIRST PWA ENGINE", [
    "Built with Next.js 14, TypeScript and Service Workers for instant mobile performance.",
    "SAN Malami portrait featured on mobile home screen icon for instant field recognition.",
    "Operates 100% offline in deep rural/riverine LGAs (Sakaba, Danko-Wasagu, Bagudo).",
    "Automated sync: queued results upload automatically upon detecting cellular signal.",
    "Ultra-low battery draw: supports 16+ hours of field operation on a single charge."
], border_color=C_EMERALD, title_color=colors.HexColor("#34D399"), title_size=11.5, item_size=9)

draw_card(50 + (col3_w + 25), 60, col3_w, 360, "2. DUAL GPS & IREV AUDIT", [
    "Dual forensic audit: compares PU agent Form EC8A against public INEC IReV uploads.",
    "Geo-fence radius <= 15m instantly flags illegal remote collation attempts.",
    "Automated high-speed ingestion of IReV endpoints across all 3,745 polling units.",
    "Instant discrepancy alerts with Form EC40G court evidence packet generation.",
    "Admissible electronic exhibits certified under Section 84 of the Nigerian Evidence Act."
], border_color=C_SKY, title_color=C_SKY, title_size=11.5, item_size=9)

draw_card(50 + 2 * (col3_w + 25), 60, col3_w, 360, "3. BILINGUAL AI LEGAL COPILOT", [
    "Intelligent assistant with English and Hausa instant language toggle (EN | HA).",
    "Role-aware: BVAS restart protocols, Section 51 objections, and photo capture guidance.",
    "Encrypted SMS/USSD fallback gateway (500,000 SMS capacity) for zero-data zones.",
    "Toll-free emergency legal dispatch hotline: 0800-ADC-MALAMI.",
    "Direct panic dispatch: notifies LGA litigation counsel and security details in 60s."
], border_color=C_AMBER, title_color=C_AMBER, title_size=11.5, item_size=9)

c.showPage()

# ==============================================================================
# SLIDE 5: ELECTORAL MATHEMATICS & CONSTITUTIONAL CRITERIA - PRISTINE & COMPLETE
# ==============================================================================
draw_background()
draw_header("SLIDE 5: ELECTORAL MATHEMATICS", "Section 179(2) Spread & Section 51 Margin Strategy", "Ensuring constitutional spread across 14+ LGAs and insurmountable lead margin", C_AMBER, colors.HexColor("#451A03"))
draw_footer(5)

draw_card(50, 60, card_w, 360, "1. SECTION 179(2) CONSTITUTIONAL SPREAD", [
    "Constitutional Threshold: Requires highest number of votes + not less than 25% of votes cast in at least 2/3 of all LGAs (14 of 21 LGAs).",
    "Kebbi Central Tactical Fortress (7/7 LGAs): Overwhelming victory in Birnin Kebbi, Gwandu, Jega, Kalgo, Aliero, Maiyama, Bunza.",
    "Southern Kebbi Coalition (7/7 LGAs): Historic equity alliance delivers Zuru, Danko-Wasagu, Sakaba, Fakai, Yauri, Ngaski, Shanga.",
    "Northern Kebbi Inroads (6/7 LGAs): Strategic border parity in Argungu, Augie, Dandi, Arewa, Suru, Bagudo.",
    "Target Achievement: ADC projects meeting 25%+ in all 21 LGAs, eliminating any legal challenge to geographical spread."
], border_color=C_EMERALD, title_color=colors.HexColor("#34D399"), title_size=12, item_size=9.5)

draw_card(50 + card_w + 30, 60, card_w, 360, "2. SECTION 51 SURPLUS MARGIN SHIELD", [
    "The Margin of Lead Rule: If Margin of Lead < Cancelled PVCs, Returning Officer must declare election INCONCLUSIVE.",
    "Simulated 2027 Projections for Kebbi State:",
    "  • Total ADC Votes: 468,540 (54.5% of total votes cast)",
    "  • Total APC Votes: 341,210 (39.7% of total votes cast)",
    "  • Projected Lead Margin: +127,330 votes",
    "  • Statewide Cancelled PVCs: 52,300 votes",
    "Net Surplus Safety Buffer: +75,030 votes above cancelled PVCs.",
    "Statutory Outcome: Decisive first-ballot declaration of Abubakar Malami SAN without rerun risk!"
], border_color=C_AMBER, title_color=C_AMBER, fill_color=colors.HexColor("#06281E"), title_size=12, item_size=9.5)

c.showPage()

# ==============================================================================
# SLIDE 6: ROLLOUT ROADMAP
# ==============================================================================
draw_background()
draw_header("SLIDE 6: ROLLOUT ROADMAP", "Statewide Implementation Timeline & Simulation Drills", "Rigorous step-by-step milestones ensuring 100% readiness prior to Election Day", colors.HexColor("#A855F7"), colors.HexColor("#3B0764"))
draw_footer(6)

draw_card(50, 60, col3_w, 360, "PHASE 1: PROVISIONING (M-2)", [
    "Custom software deployment & stress testing.",
    "Khadimiyya Foundation & ADC ward recruitment.",
    "Printing 4,200 laminated QR-code photo ID badges.",
    "Procurement of 3,745 backup power banks.",
    "Birnin Kebbi Command Centre physical outfitting."
], border_color=C_SKY, title_color=C_SKY, title_size=11.5, item_size=9.5)

draw_card(50 + (col3_w + 25), 60, col3_w, 360, "PHASE 2: SIMULATION (M-1)", [
    "Zonal training workshops (Central, North, South).",
    "Dry-run simulation drill across all 21 LGAs.",
    "Live BVAS zero-reading and mock EC8A upload.",
    "SMS gateway and satellite comms stress test.",
    "Serving legal protocols on INEC REC and security."
], border_color=C_AMBER, title_color=C_AMBER, title_size=11.5, item_size=9.5)

draw_card(50 + 2 * (col3_w + 25), 60, col3_w, 360, "PHASE 3: E-DAY EXECUTION", [
    "07:00 AM: Arrival & BVAS 000 verification.",
    "02:30 PM: Queue cutoff enforcement.",
    "04:30 PM: Form EC8A snapping & telemetry push.",
    "08:00 PM: Form EC8B & EC8C live reconciliation.",
    "02:00 AM: Form EC8D State Declaration Defense."
], border_color=C_EMERALD, title_color=colors.HexColor("#34D399"), fill_color=colors.HexColor("#06281E"), title_size=11.5, item_size=9.5)

c.showPage()

# ==============================================================================
# SLIDE 7: FINANCIAL IMPLICATIONS (MASTER BUDGET ₦329M)
# ==============================================================================
draw_background()
draw_header("SLIDE 7: FINANCIAL IMPLICATIONS", "Comprehensive Turnkey Budget Breakdown (₦329,000,000)", "Transparent, itemized capital and operational cost structure across 7 cost centers", C_AMBER, colors.HexColor("#451A03"))
draw_footer(7)

draw_card(50, 60, card_w, 360, "ITEMIZED COST CENTERS (NGN ₦)", [
    "1. Polling Unit Agent Network (3,745 PUs + 375 Runners): ₦121,725,000 (37.0%)",
    "2. Ward (RA) Supervisors & RAC Collation (225 Wards): ₦23,625,000 (7.2%)",
    "3. LGA Collation & Legal Shield Teams (21 LGAs): ₦14,175,000 (4.3%)",
    "4. Central Situation Room & Command HQ (Birnin Kebbi): ₦37,600,000 (11.4%)",
    "5. Software Engine & Telemetry (GetoCore × TEEM TECH): ₦50,000,000 (15.2%)",
    "6. Field Kits, QR Badges & 3,745 Power Banks: ₦44,082,500 (13.4%)",
    "7. Legal Shield, CTC Procurement & Contingency: ₦37,792,500 (11.5%)",
    "TOTAL MANDATE SECURITY BUDGET: ₦329,000,000 (100.0%)",
    "Unit Metric: Approximately ₦87,850 per Polling Unit for total victory defense."
], border_color=C_EMERALD, title_color=colors.HexColor("#34D399"), title_size=12, item_size=9.5)

draw_card(50 + card_w + 30, 60, card_w, 360, "PHASED 3-TRANCHE DISBURSEMENT", [
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
], border_color=colors.HexColor("#818CF8"), title_color=colors.HexColor("#C7D2FE"), fill_color=colors.HexColor("#181538"), title_size=12, item_size=9.5)

c.showPage()

# ==============================================================================
# SLIDE 8: GOVERNANCE & STRATEGIC SIGN-OFF
# ==============================================================================
draw_background()
draw_header("SLIDE 8: GOVERNANCE & CALL TO ACTION", "Accountability Controls & Project Commissioning", "Guaranteed auditability, zero waste, and immediate next steps for execution", C_EMERALD, C_EMERALD_BG)
draw_footer(8)

draw_card(50, 60, card_w, 360, "FINANCIAL GOVERNANCE & AUDIT TRAIL", [
    "Biometric / Phone Number Validation: Agent payments disbursed via direct bank transfer tied to verified PVC and accredited PU code. Zero cash leakage.",
    "Milestone-Linked Escrow: Tranches released strictly upon verified delivery of each phase (e.g. 100% badge verification before Tranche 2).",
    "Zero-Waste Protocol: Reusable assets (screens, laptops, Starlink terminals, inverters) remain permanent campaign / foundation property.",
    "Real-Time Expenditure Telemetry: Financial dashboard tracking every disbursement across all 21 Local Government Areas."
], border_color=C_SKY, title_color=C_SKY, title_size=12, item_size=9.5)

draw_card(50 + card_w + 30, 60, card_w, 360, "EXECUTIVE SIGN-OFF & COMMISSIONING", [
    "Immediate Next Steps:",
    "  1. Formal approval of the ₦329M Budget and 3-Tranche Schedule.",
    "  2. Commissioning of GetoCore Digital Innovation & TEEM TECH Solution as Lead Electoral Systems Architects.",
    "  3. Establishment of the Birnin Kebbi Situation Room facility lease.",
    "",
    "Lead IT Technical Officer: Fatima Sulaiman Umar",
    "Support Hotlines: 08035533332 / 09035328748",
    "",
    "Confidence Commitment: This architecture guarantees that every vote cast for Abubakar Malami, SAN in all 3,745 PUs is counted, transmitted, and legally defended to the Supreme Court."
], border_color=C_AMBER, title_color=C_AMBER, fill_color=colors.HexColor("#06281E"), title_size=12, item_size=9.5)

c.showPage()

c.save()

shutil.copy2(PDF_OUTPUT, ARTIFACT_OUTPUT)

print(f"SUCCESS: Generated PDF presentation at {PDF_OUTPUT} ({os.path.getsize(PDF_OUTPUT)} bytes)")
print(f"SUCCESS: Copied to artifact at {ARTIFACT_OUTPUT}")
