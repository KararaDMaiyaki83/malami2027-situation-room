import os
import zipfile
import shutil
from xml.sax.saxutils import escape

OUTPUT_DIR = "pptx_build"
PPTX_FILE = "public/Kebbi_2027_Malami_ADC_Situation_Room_Presentation.pptx"
ARTIFACT_PPTX = "/Users/user/.gemini/antigravity/brain/9cea947f-a40e-4345-9ec1-86b2feb2e4e5/Kebbi_2027_Malami_ADC_Situation_Room_Presentation.pptx"

if os.path.exists(OUTPUT_DIR):
    shutil.rmtree(OUTPUT_DIR)

os.makedirs(f"{OUTPUT_DIR}/_rels", exist_ok=True)
os.makedirs(f"{OUTPUT_DIR}/ppt/_rels", exist_ok=True)
os.makedirs(f"{OUTPUT_DIR}/ppt/slides/_rels", exist_ok=True)
os.makedirs(f"{OUTPUT_DIR}/ppt/slideLayouts/_rels", exist_ok=True)
os.makedirs(f"{OUTPUT_DIR}/ppt/slideMasters/_rels", exist_ok=True)
os.makedirs(f"{OUTPUT_DIR}/ppt/theme", exist_ok=True)

def safe(text):
    if text is None:
        return ""
    return escape(str(text))

# 1. [Content_Types].xml
content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
  <Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
  <Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
  <Override PartName="/ppt/slides/slide1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
  <Override PartName="/ppt/slides/slide2.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
  <Override PartName="/ppt/slides/slide3.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
  <Override PartName="/ppt/slides/slide4.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
  <Override PartName="/ppt/slides/slide5.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
  <Override PartName="/ppt/slides/slide6.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
  <Override PartName="/ppt/slides/slide7.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
  <Override PartName="/ppt/slides/slide8.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
</Types>"""

with open(f"{OUTPUT_DIR}/[Content_Types].xml", "w", encoding="utf-8") as f:
    f.write(content_types)

# 2. _rels/.rels
rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
</Relationships>"""

with open(f"{OUTPUT_DIR}/_rels/.rels", "w", encoding="utf-8") as f:
    f.write(rels)

# 3. ppt/presentation.xml (16:9 widescreen 12192000 x 6858000)
presentation = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldMasterIdLst>
    <p:sldMasterId id="2147483648" r:id="rId1"/>
  </p:sldMasterIdLst>
  <p:sldIdLst>
    <p:sldId id="256" r:id="rId2"/>
    <p:sldId id="257" r:id="rId3"/>
    <p:sldId id="258" r:id="rId4"/>
    <p:sldId id="259" r:id="rId5"/>
    <p:sldId id="260" r:id="rId6"/>
    <p:sldId id="261" r:id="rId7"/>
    <p:sldId id="262" r:id="rId8"/>
    <p:sldId id="263" r:id="rId9"/>
  </p:sldIdLst>
  <p:sldSz cx="12192000" cy="6858000" type="screen16x9"/>
  <p:notesSz cx="6858000" cy="9144000"/>
</p:presentation>"""

with open(f"{OUTPUT_DIR}/ppt/presentation.xml", "w", encoding="utf-8") as f:
    f.write(presentation)

# 4. ppt/_rels/presentation.xml.rels
pres_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide1.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide2.xml"/>
  <Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide3.xml"/>
  <Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide4.xml"/>
  <Relationship Id="rId6" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide5.xml"/>
  <Relationship Id="rId7" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide6.xml"/>
  <Relationship Id="rId8" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide7.xml"/>
  <Relationship Id="rId9" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide8.xml"/>
</Relationships>"""

with open(f"{OUTPUT_DIR}/ppt/_rels/presentation.xml.rels", "w", encoding="utf-8") as f:
    f.write(pres_rels)

# 5. ppt/theme/theme1.xml
theme = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Malami Situation Room Theme">
  <a:themeElements>
    <a:clrScheme name="MalamiExecutive">
      <a:dk1><a:srgbClr val="020617"/></a:dk1>
      <a:lt1><a:srgbClr val="F8FAFC"/></a:lt1>
      <a:dk2><a:srgbClr val="0F172A"/></a:dk2>
      <a:lt2><a:srgbClr val="E2E8F0"/></a:lt2>
      <a:accent1><a:srgbClr val="059669"/></a:accent1>
      <a:accent2><a:srgbClr val="D97706"/></a:accent2>
      <a:accent3><a:srgbClr val="0284C7"/></a:accent3>
      <a:accent4><a:srgbClr val="10B981"/></a:accent4>
      <a:accent5><a:srgbClr val="F59E0B"/></a:accent5>
      <a:accent6><a:srgbClr val="64748B"/></a:accent6>
      <a:hlink><a:srgbClr val="38BDF8"/></a:hlink>
      <a:folHlink><a:srgbClr val="A855F7"/></a:folHlink>
    </a:clrScheme>
    <a:fontScheme name="Office">
      <a:majorFont><a:latin typeface="Calibri"/></a:majorFont>
      <a:minorFont><a:latin typeface="Calibri"/></a:minorFont>
    </a:fontScheme>
    <a:fmtScheme name="Office">
      <a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst>
      <a:lnStyleLst><a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst>
      <a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst>
      <a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst>
    </a:fmtScheme>
  </a:themeElements>
</a:theme>"""

with open(f"{OUTPUT_DIR}/ppt/theme/theme1.xml", "w", encoding="utf-8") as f:
    f.write(theme)

# 6. ppt/slideMasters/slideMaster1.xml
master = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:bg>
      <p:bgPr><a:solidFill><a:srgbClr val="020617"/></a:solidFill></p:bgPr>
    </p:bg>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
    </p:spTree>
  </p:cSld>
  <p:clrMap bg1="dk1" tx1="lt1" bg2="dk2" tx2="lt2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
  <p:sldLayoutIdLst>
    <p:sldLayoutId id="2147483649" r:id="rId1"/>
  </p:sldLayoutIdLst>
</p:sldMaster>"""

with open(f"{OUTPUT_DIR}/ppt/slideMasters/slideMaster1.xml", "w", encoding="utf-8") as f:
    f.write(master)

master_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/>
</Relationships>"""

with open(f"{OUTPUT_DIR}/ppt/slideMasters/_rels/slideMaster1.xml.rels", "w", encoding="utf-8") as f:
    f.write(master_rels)

# 7. ppt/slideLayouts/slideLayout1.xml
layout = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
    </p:spTree>
  </p:cSld>
</p:sldLayout>"""

with open(f"{OUTPUT_DIR}/ppt/slideLayouts/slideLayout1.xml", "w", encoding="utf-8") as f:
    f.write(layout)

layout_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/>
</Relationships>"""

with open(f"{OUTPUT_DIR}/ppt/slideLayouts/_rels/slideLayout1.xml.rels", "w", encoding="utf-8") as f:
    f.write(layout_rels)

# Helper function to generate shape XML with strict XML escaping
def create_card_shape(shape_id, x, y, cx, cy, title, items, fill_hex="0F172A", border_hex="334155", title_color="F8FAFC", title_size=1800, body_size=1200):
    lines_xml = ""
    for item in items:
        clean_item = safe(item)
        lines_xml += f"""
        <a:p>
          <a:pPr lvl="0" marL="285750"><a:buChar char="•"/><a:spcBef><a:spcPts val="500"/></a:spcBef></a:pPr>
          <a:r>
            <a:rPr lang="en-US" sz="{body_size}" b="0">
              <a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill>
            </a:rPr>
            <a:t>{clean_item}</a:t>
          </a:r>
        </a:p>"""

    clean_title = safe(title)
    return f"""
    <p:sp>
      <p:nvSpPr>
        <p:cNvPr id="{shape_id}" name="Card {shape_id}"/>
        <p:cNvSpPr/>
        <p:nvPr/>
      </p:nvSpPr>
      <p:spPr>
        <a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm>
        <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 3000"/></a:avLst></a:prstGeom>
        <a:solidFill><a:srgbClr val="{fill_hex}"/></a:solidFill>
        <a:ln w="19050"><a:solidFill><a:srgbClr val="{border_hex}"/></a:solidFill></a:ln>
      </p:spPr>
      <p:txBody>
        <a:bodyPr lIns="200000" tIns="200000" rIns="200000" bIns="200000"/>
        <a:lstStyle/>
        <a:p>
          <a:pPr><a:spcAft><a:spcPts val="600"/></a:spcAft></a:pPr>
          <a:r>
            <a:rPr lang="en-US" sz="{title_size}" b="1">
              <a:solidFill><a:srgbClr val="{title_color}"/></a:solidFill>
            </a:rPr>
            <a:t>{clean_title}</a:t>
          </a:r>
        </a:p>
        {lines_xml}
      </p:txBody>
    </p:sp>"""

def create_header_footer(slide_num, tag, title, subtitle):
    clean_tag = safe(tag)
    clean_title = safe(title)
    clean_subtitle = safe(subtitle)
    return f"""
    <!-- Category Badge -->
    <p:sp>
      <p:nvSpPr><p:cNvPr id="10" name="Badge"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
      <p:spPr>
        <a:xfrm><a:off x="609600" y="457200"/><a:ext cx="4200000" cy="350000"/></a:xfrm>
        <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 10000"/></a:avLst></a:prstGeom>
        <a:solidFill><a:srgbClr val="064E3B"/></a:solidFill>
        <a:ln w="12700"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill></a:ln>
      </p:spPr>
      <p:txBody>
        <a:bodyPr lIns="100000" tIns="50000" rIns="100000" bIns="50000" anchor="ctr"/>
        <a:lstStyle/>
        <a:p>
          <a:pPr algn="ctr"/>
          <a:r>
            <a:rPr lang="en-US" sz="1100" b="1"><a:solidFill><a:srgbClr val="34D399"/></a:solidFill></a:rPr>
            <a:t>{clean_tag}</a:t>
          </a:r>
        </a:p>
      </p:txBody>
    </p:sp>

    <!-- Main Title -->
    <p:sp>
      <p:nvSpPr><p:cNvPr id="11" name="Title"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
      <p:spPr>
        <a:xfrm><a:off x="609600" y="850000"/><a:ext cx="10972800" cy="550000"/></a:xfrm>
      </p:spPr>
      <p:txBody>
        <a:bodyPr lIns="0" tIns="0" rIns="0" bIns="0"/>
        <a:lstStyle/>
        <a:p>
          <a:r>
            <a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill></a:rPr>
            <a:t>{clean_title}</a:t>
          </a:r>
        </a:p>
      </p:txBody>
    </p:sp>

    <!-- Subtitle -->
    <p:sp>
      <p:nvSpPr><p:cNvPr id="12" name="Subtitle"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
      <p:spPr>
        <a:xfrm><a:off x="609600" y="1450000"/><a:ext cx="10972800" cy="400000"/></a:xfrm>
      </p:spPr>
      <p:txBody>
        <a:bodyPr lIns="0" tIns="0" rIns="0" bIns="0"/>
        <a:lstStyle/>
        <a:p>
          <a:r>
            <a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="94A3B8"/></a:solidFill></a:rPr>
            <a:t>{clean_subtitle}</a:t>
          </a:r>
        </a:p>
      </p:txBody>
    </p:sp>

    <!-- Footer -->
    <p:sp>
      <p:nvSpPr><p:cNvPr id="13" name="Footer"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
      <p:spPr>
        <a:xfrm><a:off x="609600" y="6250000"/><a:ext cx="10972800" cy="300000"/></a:xfrm>
      </p:spPr>
      <p:txBody>
        <a:bodyPr lIns="0" tIns="0" rIns="0" bIns="0"/>
        <a:lstStyle/>
        <a:p>
          <a:r>
            <a:rPr lang="en-US" sz="950"><a:solidFill><a:srgbClr val="64748B"/></a:solidFill></a:rPr>
            <a:t>Abubakar Malami (SAN) Situation Room • Official Platform by Technical Team • Powered by GetoCore &amp; TEEM TECH (Kaduna #1 IT) | IT: Fatima Sulaiman Umar (08035533332 / 09035328748)</a:t>
          </a:r>
          <a:r>
            <a:rPr lang="en-US" sz="1000" b="1"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill></a:rPr>
            <a:t>   |   Slide {slide_num} of 8</a:t>
          </a:r>
        </a:p>
      </p:txBody>
    </p:sp>"""

# SLIDE 1: Title Slide (Cover Page)
slide1_content = f"""
    <!-- Title Background Card -->
    <p:sp>
      <p:nvSpPr><p:cNvPr id="20" name="Hero"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
      <p:spPr>
        <a:xfrm><a:off x="1000000" y="1100000"/><a:ext cx="10192000" cy="4700000"/></a:xfrm>
        <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2000"/></a:avLst></a:prstGeom>
        <a:solidFill><a:srgbClr val="0F172A"/></a:solidFill>
        <a:ln w="25400"><a:solidFill><a:srgbClr val="059669"/></a:solidFill></a:ln>
      </p:spPr>
      <p:txBody>
        <a:bodyPr lIns="500000" tIns="350000" rIns="500000" bIns="350000" anchor="ctr"/>
        <a:lstStyle/>
        <a:p>
          <a:pPr algn="ctr"/>
          <a:r>
            <a:rPr lang="en-US" sz="1300" b="1"><a:solidFill><a:srgbClr val="34D399"/></a:solidFill></a:rPr>
            <a:t>AFRICAN DEMOCRATIC CONGRESS (ADC) • KEBBI 2027 GUBERNATORIAL PROJECT</a:t>
          </a:r>
        </a:p>
        <a:p>
          <a:pPr algn="ctr"><a:spcBef><a:spcPts val="1000"/></a:spcBef><a:spcAft><a:spcPts val="600"/></a:spcAft></a:pPr>
          <a:r>
            <a:rPr lang="en-US" sz="3200" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill></a:rPr>
            <a:t>ABUBAKAR MALAMI (SAN) ELECTION 2027 SITUATION ROOM</a:t>
          </a:r>
        </a:p>
        <a:p>
          <a:pPr algn="ctr"><a:spcAft><a:spcPts val="1200"/></a:spcAft></a:pPr>
          <a:r>
            <a:rPr lang="en-US" sz="1600" b="1"><a:solidFill><a:srgbClr val="FBBF24"/></a:solidFill></a:rPr>
            <a:t>Official Parallel Vote Tabulation (PVT) &amp; Electoral Defense Command</a:t>
          </a:r>
        </a:p>
        <a:p>
          <a:pPr algn="ctr"><a:spcBef><a:spcPts val="600"/></a:spcBef></a:pPr>
          <a:r>
            <a:rPr lang="en-US" sz="1500" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill></a:rPr>
            <a:t>PREPARED FOR: ABUBAKAR MALAMI, SAN, CON</a:t>
          </a:r>
        </a:p>
        <a:p>
          <a:pPr algn="ctr"/>
          <a:r>
            <a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="94A3B8"/></a:solidFill></a:rPr>
            <a:t>Former Attorney-General of the Federation &amp; Minister of Justice | ADC Gubernatorial Candidate</a:t>
          </a:r>
        </a:p>
        <a:p>
          <a:pPr algn="ctr"><a:spcBef><a:spcPts val="1000"/></a:spcBef></a:pPr>
          <a:r>
            <a:rPr lang="en-US" sz="1100" b="1"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill></a:rPr>
            <a:t>Official Platform by the Technical Team</a:t>
          </a:r>
        </a:p>
        <a:p>
          <a:pPr algn="ctr"><a:spcBef><a:spcPts val="400"/></a:spcBef></a:pPr>
          <a:r>
            <a:rPr lang="en-US" sz="1100"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill></a:rPr>
            <a:t>Powered by GetoCore Digital Innovation &amp; TEEM TECH Solution (Kaduna&apos;s #1 IT Companies with Election Ideas)</a:t>
          </a:r>
        </a:p>
        <a:p>
          <a:pPr algn="ctr"><a:spcBef><a:spcPts val="300"/></a:spcBef></a:pPr>
          <a:r>
            <a:rPr lang="en-US" sz="1050" b="1"><a:solidFill><a:srgbClr val="FBBF24"/></a:solidFill></a:rPr>
            <a:t>Lead IT Technical Officer: Fatima Sulaiman Umar (Hotlines: 08035533332 / 09035328748)</a:t>
          </a:r>
        </a:p>
      </p:txBody>
    </p:sp>"""

# SLIDE 2: 2023 Forensic Post-Mortem & 2027 Antidote
slide2_content = create_header_footer(2, "SLIDE 2: STRATEGIC LESSONS", "Forensic Audit of 2023 vs. 2027 Winning Blueprint", "How APC won via Section 51 manipulation and our ironclad mathematical antidote") + \
create_card_shape(21, 609600, 2000000, 5200000, 3900000, "1. THE 2023 LOSS TRAP (SECTION 51)", [
  "45,000-Vote Lead Trap: In 2023, the leading party had a 45k vote lead but election was declared inconclusive because 91,000 PVCs were cancelled.",
  "Deliberate BVAS Bypasses: Targeted polling units had synthetic over-voting triggered, forcing returning officers to cancel entire wards under Section 51.",
  "Paper Disconnect: Polling unit agents had paper copies with altered figures at RAC collation centres with zero photographic or GPS timestamp proof.",
  "Supplementary Defeat: Once forced into a rerun, the state machinery deployed massive security intimidation and won the fragmented supplemental poll."
], fill_hex="1E1E2E", border_hex="F43F5E", title_color="FB7185") + \
create_card_shape(22, 6382800, 2000000, 5200000, 3900000, "2. THE 2027 MALAMI ANTIDOTE", [
  "Surplus Margin Buffer (+75k Target): Build a lead margin exceeding the statewide ceiling of cancelled PVCs, legally precluding any rerun declaration.",
  "Anti-Over-Voting Early Warning: PU Agent PWA forbids result submission if Total Votes Cast exceeds BVAS Accredited count (Section 51 check).",
  "Dual GPS Watermark: Form EC8A photos are encrypted with coordinates; any upload outside 15m radius is instantly quarantined as tampered.",
  "Instant Tribunal Dossier: Form EC40G protests filed within 30 minutes with cryptographic timestamps admissible under Section 84 Evidence Act."
], fill_hex="064E3B", border_hex="10B981", title_color="34D399")

# SLIDE 3: 4-Tier Command Structure
slide3_content = create_header_footer(3, "SLIDE 3: OPERATIONS & DISCIPLINE", "4-Tier Hierarchical Electoral Command Architecture", "Strict role containment ensuring impenetrable command from 3,745 PUs to State Command") + \
create_card_shape(31, 609600, 2000000, 2600000, 3900000, "TIER 1: 3,745 PU AGENTS", [
  "6-Stage phaser reporting: PO arrival, BVAS 000 check, queue cutoff at 2:30pm, counting, EC8A photo upload.",
  "Strict single-PU scoping.",
  "Offline local SQLite storage.",
  "100% PU coverage statewide."
], fill_hex="0F172A", border_hex="38BDF8", title_color="38BDF8", title_size=1500, body_size=1100) + \
create_card_shape(32, 3350000, 2000000, 2600000, 3900000, "TIER 2: 225 RA SUPERVISORS", [
  "Ward RAC collation oversight.",
  "Reconciliation of constituent PUs into Form EC8B.",
  "Instant Form EC8B CSV export.",
  "Motorbike rapid escort details."
], fill_hex="0F172A", border_hex="10B981", title_color="34D399", title_size=1500, body_size=1100) + \
create_card_shape(33, 6100000, 2000000, 2600000, 3900000, "TIER 3: 21 LGA SUPERVISORS", [
  "Assigned Legal Counsel at each INEC Collation Hall.",
  "Form EC8C mathematical audit.",
  "On-site filing of Section 51 protest affidavits to EO.",
  "Fast-response vehicle details."
], fill_hex="0F172A", border_hex="A855F7", title_color="C084FC", title_size=1500, body_size=1100) + \
create_card_shape(34, 8850000, 2000000, 2732400, 3900000, "TIER 4: STATE COMMAND", [
  "Birnin Kebbi Situation Room.",
  "Full oversight of all 21 LGAs.",
  "Live PVT vs IReV disparity audit.",
  "Sec 179(2) 25% spread tracker.",
  "Direct channel to SAN Malami."
], fill_hex="064E3B", border_hex="F59E0B", title_color="FBBF24", title_size=1500, body_size=1100)

# SLIDE 4: Technology & Engineering (Fully Escaped, Rich & Beautiful)
slide4_content = create_header_footer(4, "SLIDE 4: TECHNOLOGY ARCHITECTURE", "Proprietary Telemetry Engine (GetoCore × TEEM TECH)", "High-concurrency, offline-capable PWA with zero-plaintext cryptographic security") + \
create_card_shape(41, 609600, 2000000, 3500000, 3900000, "1. OFFLINE-FIRST PWA ENGINE", [
  "Built with Next.js 14, TypeScript and Service Workers for instant mobile performance.",
  "SAN Malami portrait featured on mobile home screen icon for instant field recognition.",
  "Operates 100% offline in deep rural/riverine LGAs (Sakaba, Danko-Wasagu, Bagudo).",
  "Automated sync: queued results upload automatically upon detecting cellular signal.",
  "Ultra-low battery draw: supports 16+ hours of field operation on a single charge."
], fill_hex="0F172A", border_hex="059669", title_color="34D399", title_size=1600, body_size=1150) + \
create_card_shape(42, 4350000, 2000000, 3500000, 3900000, "2. DUAL GPS & IREV AUDIT", [
  "Dual forensic audit: compares PU agent Form EC8A against public INEC IReV uploads.",
  "Geo-fence radius <= 15m instantly flags illegal remote collation attempts.",
  "Automated high-speed ingestion of IReV endpoints across all 3,745 polling units.",
  "Instant discrepancy alerts with Form EC40G court evidence packet generation.",
  "Admissible electronic exhibits certified under Section 84 of the Nigerian Evidence Act."
], fill_hex="0F172A", border_hex="0284C7", title_color="38BDF8", title_size=1600, body_size=1150) + \
create_card_shape(43, 8100000, 2000000, 3482400, 3900000, "3. BILINGUAL AI LEGAL COPILOT", [
  "Intelligent assistant with English and Hausa instant language toggle (EN | HA).",
  "Role-aware: BVAS restart protocols, Section 51 objections, and photo capture guidance.",
  "Encrypted SMS/USSD fallback gateway (500,000 SMS capacity) for zero-data zones.",
  "Toll-free emergency legal dispatch hotline: 0800-ADC-MALAMI.",
  "Direct panic dispatch: notifies LGA litigation counsel and security details in 60s."
], fill_hex="0F172A", border_hex="F59E0B", title_color="FBBF24", title_size=1600, body_size=1150)

# SLIDE 5: Constitutional Spread & Margin Analysis (Fully Escaped, Rich & Beautiful)
slide5_content = create_header_footer(5, "SLIDE 5: ELECTORAL MATHEMATICS", "Section 179(2) Spread & Section 51 Margin Strategy", "Ensuring constitutional spread across 14+ LGAs and insurmountable lead margin") + \
create_card_shape(51, 609600, 2000000, 5200000, 3900000, "1. SECTION 179(2) CONSTITUTIONAL SPREAD", [
  "Constitutional Threshold: Requires highest number of votes + not less than 25% of votes cast in at least 2/3 of all LGAs (14 of 21 LGAs).",
  "Kebbi Central Tactical Fortress (7/7 LGAs): Overwhelming victory in Birnin Kebbi, Gwandu, Jega, Kalgo, Aliero, Maiyama, Bunza.",
  "Southern Kebbi Coalition (7/7 LGAs): Historic equity alliance delivers Zuru, Danko-Wasagu, Sakaba, Fakai, Yauri, Ngaski, Shanga.",
  "Northern Kebbi Inroads (6/7 LGAs): Strategic border parity in Argungu, Augie, Dandi, Arewa, Suru, Bagudo.",
  "Target Achievement: ADC projects meeting 25%+ in all 21 LGAs, eliminating any legal challenge to geographical spread."
], fill_hex="0F172A", border_hex="10B981", title_color="34D399", title_size=1700, body_size=1200) + \
create_card_shape(52, 6382800, 2000000, 5200000, 3900000, "2. SECTION 51 SURPLUS MARGIN SHIELD", [
  "The Margin of Lead Rule: If Margin of Lead < Cancelled PVCs, Returning Officer must declare election INCONCLUSIVE.",
  "Simulated 2027 Projections for Kebbi State:",
  "  • Total ADC Votes: 468,540 (54.5% of total votes cast)",
  "  • Total APC Votes: 341,210 (39.7% of total votes cast)",
  "  • Projected Lead Margin: +127,330 votes",
  "  • Statewide Cancelled PVCs: 52,300 votes",
  "Net Surplus Safety Buffer: +75,030 votes above cancelled PVCs.",
  "Statutory Outcome: Decisive first-ballot declaration of Abubakar Malami SAN without rerun risk!"
], fill_hex="064E3B", border_hex="F59E0B", title_color="FBBF24", title_size=1700, body_size=1200)

# SLIDE 6: Implementation Roadmap & Mock Simulation
slide6_content = create_header_footer(6, "SLIDE 6: ROLLOUT ROADMAP", "Statewide Implementation Timeline & Simulation Drills", "Rigorous step-by-step milestones ensuring 100% readiness prior to Election Day") + \
create_card_shape(61, 609600, 2000000, 3500000, 3900000, "PHASE 1: PROVISIONING (M-2)", [
  "Custom software deployment & stress testing.",
  "Khadimiyya Foundation & ADC ward recruitment.",
  "Printing 4,200 laminated QR-code photo ID badges.",
  "Procurement of 3,745 backup power banks.",
  "Birnin Kebbi Command Centre physical outfitting."
], fill_hex="0F172A", border_hex="38BDF8", title_color="38BDF8", title_size=1600, body_size=1150) + \
create_card_shape(62, 4350000, 2000000, 3500000, 3900000, "PHASE 2: SIMULATION (M-1)", [
  "Zonal training workshops (Central, North, South).",
  "Dry-run simulation drill across all 21 LGAs.",
  "Live BVAS zero-reading and mock EC8A upload.",
  "SMS gateway and satellite comms stress test.",
  "Serving legal protocols on INEC REC and security."
], fill_hex="0F172A", border_hex="F59E0B", title_color="FBBF24", title_size=1600, body_size=1150) + \
create_card_shape(63, 8100000, 2000000, 3482400, 3900000, "PHASE 3: E-DAY EXECUTION", [
  "07:00 AM: Arrival & BVAS 000 verification.",
  "02:30 PM: Queue cutoff enforcement.",
  "04:30 PM: Form EC8A snapping & telemetry push.",
  "08:00 PM: Form EC8B & EC8C live reconciliation.",
  "02:00 AM: Form EC8D State Declaration Defense."
], fill_hex="064E3B", border_hex="10B981", title_color="34D399", title_size=1600, body_size=1150)

# SLIDE 7: Financial Implication & Master Budget
slide7_content = create_header_footer(7, "SLIDE 7: FINANCIAL IMPLICATIONS", "Comprehensive Turnkey Budget Breakdown (₦329,000,000)", "Transparent, itemized capital and operational cost structure across 7 cost centers") + \
create_card_shape(71, 609600, 2000000, 5200000, 3900000, "ITEMIZED COST CENTERS (NGN ₦)", [
  "1. Polling Unit Agent Network (3,745 PUs + 375 Runners): ₦121,725,000 (37.0%)",
  "2. Ward (RA) Supervisors & RAC Collation (225 Wards): ₦23,625,000 (7.2%)",
  "3. LGA Collation & Legal Shield Teams (21 LGAs): ₦14,175,000 (4.3%)",
  "4. Central Situation Room & Command HQ (Birnin Kebbi): ₦37,600,000 (11.4%)",
  "5. Software Engine & Telemetry (GetoCore × TEEM TECH): ₦50,000,000 (15.2%)",
  "6. Field Kits, QR Badges & 3,745 Power Banks: ₦44,082,500 (13.4%)",
  "7. Legal Shield, CTC Procurement & Contingency: ₦37,792,500 (11.5%)",
  "TOTAL MANDATE SECURITY BUDGET: ₦329,000,000 (100.0%)",
  "Unit Metric: Approximately ₦87,850 per Polling Unit for total victory defense."
], fill_hex="0F172A", border_hex="10B981", title_color="34D399", title_size=1700, body_size=1150) + \
create_card_shape(72, 6382800, 2000000, 5200000, 3900000, "PHASED 3-TRANCHE DISBURSEMENT", [
  "Tranche 1: Mobilization & Tech Provisioning (40%):",
  "  • ₦131,600,000 due at contract execution (T - 60 Days).",
  "  • Covers platform customization, cloud infra, power banks, badge printing, Birnin Kebbi Situation Room setup.",
  "",
  "Tranche 2: Field Training & Mock Simulation (35%):",
  "  • ₦115,150,000 due upon platform readiness (T - 21 Days).",
  "  • Covers training stipends for 3,745 PU agents + 225 RA supervisors, data recharges, 21-LGA mock simulation.",
  "",
  "Tranche 3: D-Day Operations & Legal Vault (25%):",
  "  • ₦82,250,000 due 5 days before election (T - 5 Days).",
  "  • Covers D-Day honoraria, RAC transport, LGA counsel retainers, 48hr Situation Room ops, CTC legal procurement."
], fill_hex="1E1B4B", border_hex="818CF8", title_color="C7D2FE", title_size=1700, body_size=1150)

# SLIDE 8: Governance & Strategic Sign-Off
slide8_content = create_header_footer(8, "SLIDE 8: GOVERNANCE & CALL TO ACTION", "Accountability Controls & Project Commissioning", "Guaranteed auditability, zero waste, and immediate next steps for execution") + \
create_card_shape(81, 609600, 2000000, 5200000, 3900000, "FINANCIAL GOVERNANCE & AUDIT TRAIL", [
  "Biometric / Phone Number Validation: Agent payments disbursed via direct bank transfer tied to verified PVC and accredited PU code.",
  "Milestone-Linked Escrow: Tranches released strictly upon verified delivery of each phase (e.g. 100% badge verification before Tranche 2).",
  "Zero-Waste Protocol: Reusable assets (screens, laptops, Starlink terminals, inverters) remain permanent campaign / foundation property.",
  "Real-Time Expenditure Telemetry: Financial dashboard tracking every disbursement across all 21 Local Government Areas."
], fill_hex="0F172A", border_hex="38BDF8", title_color="38BDF8", title_size=1700, body_size=1150) + \
create_card_shape(82, 6382800, 2000000, 5200000, 3900000, "EXECUTIVE SIGN-OFF & COMMISSIONING", [
  "Immediate Next Steps:",
  "  1. Formal approval of the ₦329M Budget and 3-Tranche Schedule.",
  "  2. Commissioning of GetoCore Digital Innovation & TEEM TECH Solution as Lead Electoral Systems Architects.",
  "  3. Establishment of the Birnin Kebbi Situation Room facility lease.",
  "",
  "Lead IT Technical Officer: Fatima Sulaiman Umar",
  "Support Hotlines: 08035533332 / 09035328748",
  "",
  "Confidence Commitment: This architecture guarantees that every vote cast for Abubakar Malami, SAN in all 3,745 PUs is counted, transmitted, and legally defended to the Supreme Court."
], fill_hex="064E3B", border_hex="F59E0B", title_color="FBBF24", title_size=1700, body_size=1150)

slides = [
    slide1_content,
    slide2_content,
    slide3_content,
    slide4_content,
    slide5_content,
    slide6_content,
    slide7_content,
    slide8_content
]

for i, slide_body in enumerate(slides, 1):
    slide_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:bg>
      <p:bgPr><a:solidFill><a:srgbClr val="020617"/></a:solidFill></p:bgPr>
    </p:bg>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
      {slide_body}
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>"""

    with open(f"{OUTPUT_DIR}/ppt/slides/slide{i}.xml", "w", encoding="utf-8") as f:
        f.write(slide_xml)

    slide_rel = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
</Relationships>"""
    with open(f"{OUTPUT_DIR}/ppt/slides/_rels/slide{i}.xml.rels", "w", encoding="utf-8") as f:
        f.write(slide_rel)

# Package into .pptx (zip)
with zipfile.ZipFile(PPTX_FILE, "w", zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(OUTPUT_DIR):
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, OUTPUT_DIR)
            zf.write(file_path, arcname)

# Also copy to artifacts directory
shutil.copy2(PPTX_FILE, ARTIFACT_PPTX)

print(f"Successfully generated PowerPoint file: {PPTX_FILE} (Size: {os.path.getsize(PPTX_FILE)} bytes)")
print(f"Copied to artifacts: {ARTIFACT_PPTX}")
