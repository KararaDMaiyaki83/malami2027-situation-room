'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Scale, 
  ShieldAlert, 
  CheckCircle2, 
  Globe, 
  PhoneCall, 
  Trash2, 
  ChevronDown,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { AppUser } from '@/types/auth';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  references?: string[];
  actionLink?: { label: string; url?: string };
}

interface MalamiAIChatbotProps {
  currentUser: AppUser | null;
  onOpenIReVAudit?: () => void;
}

export function MalamiAIChatbot({ currentUser, onOpenIReVAudit }: MalamiAIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'HA'>('EN'); // English or Hausa
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const role = currentUser?.role || 'SITUATION_ROOM';

  // Role-specific and Language-specific Quick Suggestion Prompts
  const getSuggestions = () => {
    if (language === 'HA') {
      switch (role) {
        case 'PU_AGENT':
          return [
            'Yaya zan magance matsalar BVAS idan ta ƙi tantance masu zaɓe?',
            'Me ya kamata in yi idan akwai kuri\'u da suka fi adadin wadanda aka tantance (Over-voting)?',
            'Yadda ake ɗaukar hoton Form EC8A a tura Situation Room?',
            'Shin jami\'in INEC na da ikon canza sakamako a gaban kowa?'
          ];
        case 'RA_SUPERVISOR':
          return [
            'Yaya ake duba lissafin Form EC8B don tabbatar da babu maguɗi?',
            'Menene matakin da za a ɗauka idan jami\'in PO bai kawo sakamako a kan lokaci ba?',
            'Yaya za a rubuta ƙorafi na hukuma a matakin Ward Collation?'
          ];
        case 'LGA_SUPERVISOR':
          return [
            'Yaya ake kare sakamakon LGA a ƙarƙashin Sashe na 51 na Dokar Zaɓe?',
            'Matakan shigar da rantsuwar ƙorafi (Affidavit) ga Electoral Officer?',
            'Yadda za a tabbatar da cewa APC ba ta soke rumfunan da Malami ke kan gaba ba?'
          ];
        default:
          return [
            'Yaya matsayin Malami yake wajen samun kashi 25% a kananan hukumomi 14?',
            'Yaya muke gano bambancin sakamakon IReV da na PU Agent ta hanyar GPS?',
            'Wane shiri aka yi na kare kuri\'u a kotun zaɓe (Tribunal Briefs)?'
          ];
      }
    } else {
      switch (role) {
        case 'PU_AGENT':
          return [
            'BVAS fails voter fingerprint/facial authentication. What is the legal procedure?',
            'Voter count exceeds BVAS accreditation (Over-voting). How to trigger Section 51?',
            'Steps to take clear EC8A photo and verify tamper-evident hash?',
            'INEC Presiding Officer refuses to give me a certified true duplicate EC8A.'
          ];
        case 'RA_SUPERVISOR':
          return [
            'How to cross-reconcile constituent PU EC8As into Ward Form EC8B?',
            'A Presiding Officer went missing between PU and Ward collation center.',
            'Discrepancy spotted between physical EC8A and figures entered on EC8B.'
          ];
        case 'LGA_SUPERVISOR':
          return [
            'How to enforce Section 51 margin vs cancelled PVC buffer at LGA collation?',
            'Draft immediate protest affidavit against attempted PU cancellation by EO.',
            'Procedure to demand recount of BVAS electronic audit logs before signing EC8C.'
          ];
        default:
          return [
            'Verify Section 179(2) Constitutional 25% spread across 14 of 21 LGAs.',
            'Explain how PU Agent EC8A vs INEC IReV GPS geo-fence audit works.',
            'What is ADC’s legal defense strategy against inconclusive election declaration?'
          ];
      }
    }
  };

  // Default initial greeting message
  const getInitialMessage = (): ChatMessage => {
    if (language === 'HA') {
      return {
        id: 'msg-init',
        sender: 'bot',
        text: `Barka da zuwa! Ni ne Mataimakin Zaɓe na Abubakar Malami, SAN (ADC). Ina nan don taimaka maka a matsayinka na ${
          role === 'PU_AGENT' ? 'Wakilin Rumfar Zaɓe (PU Agent)' :
          role === 'RA_SUPERVISOR' ? 'Mai Kula da Mazaba (RA Supervisor)' :
          role === 'LGA_SUPERVISOR' ? 'Lauya/Mai Kula da Karamar Hukuma (LGA Legal Shield)' :
          'Babban Mai Gudanarwa a Situation Room'
        }. Tambaye ni komai game da Dokar Zaɓe ta 2022, na\'urar BVAS, Form EC8A, ko dabarun kare kuri\'u.`,
        timestamp: 'Yanzu',
        references: ['Electoral Act 2022 Section 51 & 64', 'INEC Manual 2027']
      };
    } else {
      return {
        id: 'msg-init',
        sender: 'bot',
        text: `Welcome! I am the Malami 2027 AI Legal & Field Copilot, powered by Abubakar Malami SAN's election defense protocols. I am actively calibrated for your role as **${
          role === 'PU_AGENT' ? 'Polling Unit Agent (Level 1)' :
          role === 'RA_SUPERVISOR' ? 'Ward Registration Area Supervisor (Level 2)' :
          role === 'LGA_SUPERVISOR' ? 'LGA Legal Shield & Collation Officer (Level 3)' :
          'State Situation Room Coordinator (Level 4)'
        }**. Ask me any question on Electoral Act 2022 compliance, BVAS troubleshooting, arithmetic audit, or Section 51 anti-over-voting defense.`,
        timestamp: 'Just now',
        references: ['Electoral Act 2022', '1999 Constitution Sec 179(2)', 'INEC Regulations']
      };
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([getInitialMessage()]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle switching language dynamically updates greeting if no chat history
  const handleToggleLanguage = (newLang: 'EN' | 'HA') => {
    setLanguage(newLang);
    if (messages.length === 1) {
      if (newLang === 'HA') {
        setMessages([{
          id: 'msg-init',
          sender: 'bot',
          text: `Barka da zuwa! Ni ne Mataimakin Zaɓe na Abubakar Malami, SAN (ADC). Ina nan don taimaka maka a matsayinka na jami'in ADC. Tambaye ni komai game da Dokar Zaɓe ta 2022, na'urar BVAS, da dabarun kare kuri'u.`,
          timestamp: 'Yanzu',
          references: ['Dokar Zaɓe ta 2022', 'Kariyar Kuri\'u ta Malami']
        }]);
      } else {
        setMessages([{
          id: 'msg-init',
          sender: 'bot',
          text: `Welcome! I am the Malami 2027 AI Legal & Field Copilot, calibrated for your role in the Kebbi Governorship Election. Ask me anything about Electoral Act rules, BVAS troubleshooting, or collation legal defense.`,
          timestamp: 'Just now',
          references: ['Electoral Act 2022', 'INEC Regulations 2027']
        }]);
      }
    }
  };

  // Realistic electoral intelligence response engine
  const generateAIResponse = (query: string): { text: string; references: string[] } => {
    const q = query.toLowerCase();

    // BVAS Queries
    if (q.includes('bvas') || q.includes('fingerprint') || q.includes('facial') || q.includes('tantance')) {
      if (language === 'HA') {
        return {
          text: `**Matakan Magance Matsalar BVAS:**
1. Idan BVAS ta gaza karanta yatsa, dole ne jami'in Presiding Officer ya yi amfani da **Facial Authentication** (hoton fuska).
2. **Kada a yarda a yi zabe da takarda kawai ba tare da BVAS ba** — Sashe na 47(2) na Dokar Zaɓe ya haramta hakan. Duk kuri'un da aka kada ba tare da BVAS ba haramtattu ne.
3. Idan na'urar BVAS ta samu matsalar batir ko fasaha, Presiding Officer dole ne ya kira INEC RAC Tech Support nan take. Zabe zai dakata har sai an gyara ko an kawo sabuwar BVAS.
4. Rubuta lambar BVAS da lambar katin zabe na mutumin da aka samu matsalar a takardarku ta rahoto.`,
          references: ['Sashe na 47(2) na Dokar Zaɓe 2022', 'Littafin Jagoran INEC 2027']
        };
      } else {
        return {
          text: `**BVAS Accreditation & Troubleshooting Protocol:**
1. **Bimodal Redundancy:** If fingerprint verification fails, the Presiding Officer MUST proceed immediately to **Facial Recognition**.
2. **Strict Prohibition of Manual Voting:** Under **Section 47(2) of the Electoral Act 2022**, no person shall be allowed to vote without electronic verification through BVAS. Any polling unit where voting proceeds manually is liable to complete cancellation under Section 51.
3. **Hardware/Battery Fault:** Presiding Officer must notify the Ward RAC Tech Support Officer immediately. If BVAS is replaced, all previous accreditations remain locked in the encrypted memory and cannot be duplicated.
4. Record the BVAS serial number and battery status on your digital Form EEC8A log immediately.`,
          references: ['Section 47(2) Electoral Act 2022', 'INEC BVAS Operating Guidelines Paragraph 19']
        };
      }
    }

    // Over-voting / Section 51 Queries
    if (q.includes('over-voting') || q.includes('section 51') || q.includes('kuri\'u da suka fi') || q.includes('sashe na 51') || q.includes('inconclusive')) {
      if (language === 'HA') {
        return {
          text: `**Dokar Sashe na 51 (Anti Over-Voting & Rerun Defense):**
1. **Ma'anar Over-voting:** Idan jimillar kuri'un da aka kada a rumfar zabe ta zarce adadin mutanen da BVAS ta tantance, **dole ne a soke rumfar**.
2. **Dabarar Malami kan Inconclusive:** A zaben 2023, an ayyana zabe inconclusive ne saboda kuri'un da aka soke sun fi tazarar nasara (Margin of Lead). A yanzu, tazarar ADC ta zarce kuri'un da aka soke da fiye da kuri'u 75,000, don haka INEC ba ta da hurumin kiran sabon zabe (Rerun).
3. **Mataki ga Wakili:** Idan wata jam'iyya ta yi kokarin jefa kuri'un bogi, nuna wa Presiding Officer allon BVAS nan take sannan ka ki sanya hannu a Form EC8A har sai an daidaita lissafi.`,
          references: ['Sashe na 51(1) & 51(2) na Dokar Zaɓe 2022', 'Malami Legal Strategy Document']
        };
      } else {
        return {
          text: `**Section 51 Electoral Act 2022 & Conclusive Victory Doctrine:**
1. **Statutory Definition of Over-Voting:** Under **Section 51(2)**, where the total number of votes cast at a polling unit exceeds the number of accredited voters recorded by BVAS, the result of that polling unit is NULL and VOID.
2. **The Margin of Lead Principle:** In 2023 Kebbi elections, a supplementary election was forced because the lead margin (45k) was smaller than the 91k cancelled PVCs. Today, ADC’s statewide lead margin (+${formatNumber(79850)}) exceeds total cancelled PVCs (${formatNumber(4820)}) by a decisive surplus of **+75,030 votes**. Under Section 51(3), the Returning Officer MUST make a conclusive return!
3. **Field Action:** If over-voting is detected, immediately refuse to endorse the fraudulent sheet, snap the BVAS screen showing total accredited voters, and execute a Section 51 Protest Affidavit.`,
          references: ['Section 51(1), (2) & (3) Electoral Act 2022', 'Supreme Court Precedent: Adeleke v. Oyetola (2023)']
        };
      }
    }

    // Form EC8A / EC8B / EC8C upload and custody
    if (q.includes('ec8a') || q.includes('ec8b') || q.includes('ec8c') || q.includes('photo') || q.includes('irev') || q.includes('gps') || q.includes('hoton')) {
      if (language === 'HA') {
        return {
          text: `**Kariyar Form EC8A da Binciken GPS na INEC IReV:**
1. **Daukar Hoto:** Da zaran Presiding Officer ya gama lissafi ya rubuta Form EC8A, tabbatar ka ɗauki cikakken hoto a kwance mai haske.
2. **Kariyar GPS:** Wannan manhaja tana auna inda kake (GPS coordinates). Idan INEC IReV ta loda wani sakamako daga wani gida ko dakin otal da ya wuce mita 15 daga ainihin rumfar zaben, tsarinmu zai gano hakan nan take don amfani a kotu.
3. **Kafin Barin Rumfa:** Kar ka bar rumfar zabe ba tare da kwafin Form EC8A mai tambari da sa hannun jami'in INEC ba.`,
          references: ['Sashe na 60 & 64 na Dokar Zaɓe 2022', 'INEC IReV Regulations']
        };
      } else {
        return {
          text: `**Form EC8A Physical Evidence & Dual GPS Verification Protocol:**
1. **Mandatory Duplicate Copy:** Under **Section 60(5) of the Electoral Act 2022**, the Presiding Officer is statutorily required to complete Form EC8A, sign it, stamp it, and hand an authentic duplicate directly to accredited party agents.
2. **Dual Forensic GPS Verification:** Our web application compares the physical GPS location where you snapshot Form EC8A against the electronic transmission metadata on INEC IReV. Any divergence greater than **15 meters** flags an immediate remote interception alert for our Legal Shield Team.
3. **Audit Trail:** Even if cellular service drops, our offline PWA stores the SHA-256 digital hash of your EC8A photo and timestamps it for tribunal admissibility.`,
          references: ['Section 60(4)-(5) Electoral Act 2022', 'Section 64(4) Electronic Collation Verification']
        };
      }
    }

    // 25% Constitutional spread
    if (q.includes('25%') || q.includes('spread') || q.includes('constitution') || q.includes('179') || q.includes('tsarin mulki')) {
      if (language === 'HA') {
        return {
          text: `**Kashi 25% na Tsarin Mulki (Sashe na 179(2)):**
1. Don a ayyana Abubakar Malami, SAN a matsayin Gwamnan Jihar Kebbi, dole ne ya cika sharuɗɗa biyu:
   - Ya sami mafi yawan kuri'u masu inganci a jihar gaba daya (Highest number of valid votes).
   - Ya sami akalla kashi 25% na kuri'un da aka kada a akalla kashi biyu cikin uku (2/3) na kananan hukumomin jihar (wato akalla kananan hukumomi 14 cikin 21).
2. **Halin da Ake Ciki:** A halin yanzu, ADC tana kan gaba da fiye da kashi 25% a dukkan kananan hukumomi 21 na jihar Kebbi! Wannan ya cika dukkan sharudan tsarin mulki.`,
          references: ['Sashe na 179(2)(b) na Tsarin Mulkin Najeriya 1999', 'Dokokin INEC 2027']
        };
      } else {
        return {
          text: `**Constitutional Spread Requirement (Section 179(2) 1999 Constitution):**
1. **Dual Criteria for Declaration:**
   - **Highest Popular Votes:** The candidate must poll the highest number of valid votes cast statewide.
   - **Geographic Spread:** The candidate must secure not less than **one-quarter (25%)** of the votes cast in each of at least **two-thirds of all Local Government Areas** ($\frac{2}{3} \times 21 = 14$ LGAs in Kebbi State).
2. **Current Performance:** ADC under Abubakar Malami, SAN currently clears 25%+ in **all 21 LGAs**, exceeding the constitutional requirement of 14 LGAs by +7 LGAs. A declaration is legally incontrovertible.`,
          references: ['Section 179(2) 1999 Constitution (as amended)', 'INEC State Collation Manual']
        };
      }
    }

    // General fallback advice
    if (language === 'HA') {
      return {
        text: `Na fahimci tambayarka game da "${query}". 
A matsayinka na jami'in ADC a zaben Gwamnan Kebbi na 2027:
1. Tabbatar da cewa dukkan bayanan da kake tattarawa suna da hujjojin takarda da hotuna masu haske.
2. Idan akwai matsalar gaggawa ta tsaro ko yunkurin murɗe zaɓe, danna maballin kiran gaggawa (SOS Hotline) nan take.
3. Dukkan kuri'un da Abubakar Malami, SAN ya samu dole ne a rubuta su daidai a kan Form EC8A, EC8B, da EC8C ba tare da wani canji ba.`,
        references: ['Electoral Act 2022', 'Malami Campaign Situation Room']
      };
    } else {
      return {
        text: `Understood regarding "${query}". 
As a key field operative for Abubakar Malami, SAN (ADC) in the Kebbi 2027 Governorship Election:
1. **Evidence Superiority:** Ensure all observations are backed with timestamped photographic and documentary evidence (Forms EC8A, EC8B, EC8C, EC40G).
2. **Zero Compromise on Collation:** Never leave a collation room until results are tallied openly and duplicate signed sheets are physically in hand.
3. **Escalation Protocol:** For acute threats or attempted result alterations, deploy an immediate Section 51 Protest Affidavit and notify the Legal Shield command desk.`,
        references: ['Electoral Act 2022', 'Malami Legal Defense Doctrine']
      };
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(query);
      const botMessage: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        references: response.references
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 700);
  };

  const clearChat = () => {
    setMessages([getInitialMessage()]);
  };

  function formatNumber(num: number): string {
    return num.toLocaleString();
  }

  return (
    <>
      {/* FLOATING CHATBOT LAUNCHER BUTTON */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="fixed bottom-5 right-5 z-40 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-2xl shadow-emerald-700/50 flex items-center gap-3 border border-emerald-400/40 transition-all transform hover:scale-105 group no-print"
          title="Open Malami AI Electoral Field & Legal Copilot"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full"></span>
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-black tracking-wide flex items-center gap-1">
              <span>MALAMI AI COPILOT</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </span>
            <span className="text-[10px] text-emerald-200 font-medium">
              {language === 'HA' ? 'Mataimakin Zaɓe & Dokoki' : 'Legal & Field Intelligence'}
            </span>
          </div>
        </button>
      )}

      {/* FLOATING CHATBOT DRAWER / WINDOW */}
      {isOpen && (
        <div 
          className={`fixed bottom-5 right-5 z-50 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all no-print ${
            isMinimized 
              ? 'w-80 h-16' 
              : 'w-full sm:w-[420px] max-w-[calc(100vw-24px)] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* HEADER */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-3.5 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-black text-white uppercase tracking-tight">
                    {language === 'HA' ? 'Mataimakin Zaɓe na AI' : 'Malami AI Legal Copilot'}
                  </h4>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    2027
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{currentUser?.name ? currentUser.name.split(' ')[0] : 'Operative'}</span>
                  <span>&bull;</span>
                  <span className="text-emerald-400 font-mono text-[9px]">{role}</span>
                </div>
              </div>
            </div>

            {/* Language Toggle & Controls */}
            <div className="flex items-center gap-1.5">
              {/* Language Selector */}
              <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px] font-bold">
                <button
                  onClick={() => handleToggleLanguage('EN')}
                  className={`px-1.5 py-0.5 rounded transition-all ${
                    language === 'EN' 
                      ? 'bg-emerald-600 text-white shadow' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleToggleLanguage('HA')}
                  className={`px-1.5 py-0.5 rounded transition-all ${
                    language === 'HA' 
                      ? 'bg-emerald-600 text-white shadow' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  HA
                </button>
              </div>

              {/* Minimize Toggle */}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                title={isMinimized ? 'Expand Chat' : 'Minimize Chat'}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CHAT BODY (Hidden if Minimized) */}
          {!isMinimized && (
            <>
              {/* Emergency Banner & Action Link */}
              <div className="bg-slate-950/90 px-3.5 py-1.5 border-b border-slate-800 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1 text-slate-300">
                  <Scale className="w-3 h-3 text-amber-400" />
                  <span>Abubakar Malami SAN Legal Shield Active</span>
                </div>
                <button
                  onClick={clearChat}
                  className="text-slate-500 hover:text-rose-400 flex items-center gap-1"
                  title="Clear chat history"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </div>

              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
                  >
                    <div
                      className={`p-3 rounded-2xl max-w-[88%] leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-br-none shadow-md shadow-emerald-700/20'
                          : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-bl-none shadow-md'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{m.text}</div>

                      {/* References / Legal Citations */}
                      {m.references && m.references.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex flex-wrap gap-1">
                          {m.references.map((r, i) => (
                            <span 
                              key={i} 
                              className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-900/80 text-emerald-300 border border-slate-700"
                            >
                              § {r}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-slate-500 px-1 font-mono">{m.timestamp}</span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 p-3 bg-slate-800/60 rounded-2xl max-w-[70%] border border-slate-700/50">
                    <Bot className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                    <span className="text-[11px] text-slate-400 italic">
                      {language === 'HA' ? 'AI tana bincika Dokokin Zaɓe...' : 'Malami AI analyzing legal provisions...'}
                    </span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* QUICK SUGGESTION CHIPS */}
              <div className="px-3.5 py-2 bg-slate-950 border-t border-slate-800/80 shrink-0">
                <div className="text-[10px] text-slate-400 mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{language === 'HA' ? 'Tambayoyi masu sauri:' : 'Quick role suggestions:'}</span>
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {getSuggestions().map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(s)}
                      className="px-2.5 py-1 rounded-lg bg-slate-850 hover:bg-emerald-950/60 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 text-[10px] whitespace-nowrap transition-all shrink-0"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* INPUT BAR */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      language === 'HA' 
                        ? 'Rubuta tambaya ga Malami AI...' 
                        : 'Ask Malami AI field or legal question...'
                    }
                    className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white transition-all shadow"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Emergency Hotline Footer */}
                <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 px-1">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Active Field Encryption</span>
                  </span>
                  <a 
                    href="tel:0800-ADC-MALAMI" 
                    className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>Emergency SOS Hotline</span>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
