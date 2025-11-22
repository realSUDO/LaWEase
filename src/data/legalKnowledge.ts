export function getLegalResponse(query: string): string | null {
  const q = query.toLowerCase();
  
  // Constitution basics
  if (q.includes('preamble')) return "The Preamble declares India as a Sovereign, Socialist, Secular, Democratic Republic. It embodies the objectives of justice, liberty, equality, and fraternity.";
  if (q.includes('fundamental right')) return "Part III of the Constitution guarantees six categories of Fundamental Rights: Right to Equality (14-18), Right to Freedom (19-22), Right against Exploitation (23-24), Right to Freedom of Religion (25-28), Cultural and Educational Rights (29-30), and Right to Constitutional Remedies (32).";
  if (q.includes('article 14')) return "Article 14 guarantees equality before law and equal protection of laws. The State shall not deny to any person equality before the law or equal protection of the laws within India.";
  if (q.includes('article 19')) return "Article 19 guarantees six freedoms: speech and expression, assembly, association, movement, residence, and profession. These are subject to reasonable restrictions.";
  if (q.includes('article 21')) return "Article 21 protects life and personal liberty. No person shall be deprived of life or personal liberty except according to procedure established by law. The Supreme Court has expanded this to include right to privacy, dignity, education, clean environment, and livelihood.";
  if (q.includes('article 32')) return "Article 32 is the Right to Constitutional Remedies. Dr. Ambedkar called it the 'heart and soul' of the Constitution. It allows citizens to move the Supreme Court directly for enforcement of Fundamental Rights through writs.";
  if (q.includes('dpsp') || q.includes('directive principle')) return "Directive Principles of State Policy (Part IV) are guidelines for the state to establish social and economic democracy. They are non-justiciable but fundamental in governance.";
  if (q.includes('fundamental dut')) return "Article 51A lists 11 Fundamental Duties added by the 42nd Amendment (1976). They are moral obligations for citizens to promote patriotism and uphold unity.";
  
  // Basic Structure
  if (q.includes('basic structure')) return "The Basic Structure Doctrine was established in Kesavananda Bharati v. State of Kerala (1973). It holds that Parliament cannot amend the core foundational principles of the Constitution like supremacy of the Constitution, rule of law, independence of judiciary, secularism, federalism, and separation of powers.";
  
  // Parliament & Executive
  if (q.includes('parliament')) return "The Indian Parliament consists of the President, Rajya Sabha (Council of States with 245 members), and Lok Sabha (House of the People with up to 552 members). Parliament has legislative, financial, and control powers.";
  if (q.includes('lok sabha')) return "Lok Sabha is the Lower House directly elected by people for 5 years. It has maximum 552 members. Money Bills can only be introduced here. It can pass a no-confidence motion against the government.";
  if (q.includes('rajya sabha')) return "Rajya Sabha is the Upper House with 245 members elected by state assemblies for 6-year terms. One-third retire every 2 years. It represents states and has limited powers over Money Bills.";
  if (q.includes('president')) return "The President is the constitutional head of state elected by an Electoral College for 5 years. All executive actions are taken in the President's name. Real power lies with the Prime Minister and Council of Ministers.";
  if (q.includes('prime minister')) return "The Prime Minister is the head of government and leader of the majority party in Lok Sabha. The PM heads the Council of Ministers and is the real executive authority.";
  if (q.includes('money bill')) return "A Money Bill (Article 110) deals only with taxation, borrowing, or Consolidated Fund. It can only be introduced in Lok Sabha with President's recommendation. Rajya Sabha can only make recommendations within 14 days.";
  
  // Judiciary
  if (q.includes('supreme court')) return "The Supreme Court is the apex court with 34 judges including the Chief Justice. It has original, appellate, and advisory jurisdiction. It exercises judicial review and can issue writs under Article 32.";
  if (q.includes('judicial review')) return "Judicial Review is the power of courts to examine the constitutionality of legislative and executive actions. It's a part of the Basic Structure and ensures constitutional supremacy.";
  if (q.includes('writ')) return "Five writs under Articles 32 and 226: Habeas Corpus (produce detained person), Mandamus (command to perform duty), Prohibition (prevent lower court from exceeding jurisdiction), Certiorari (quash order of lower court), Quo Warranto (question authority of public office holder).";
  if (q.includes('pil') || q.includes('public interest')) return "Public Interest Litigation allows any citizen to file a petition for enforcement of public interest or rights of disadvantaged persons, even without direct personal injury. It's a tool of judicial activism.";
  if (q.includes('collegium')) return "The Collegium System is where senior Supreme Court judges led by the CJI recommend appointments and transfers of judges. It was upheld when the NJAC was struck down for violating judicial independence.";
  
  // Emergency
  if (q.includes('emergency')) return "Three types of emergencies: National Emergency (Article 352) on grounds of war/external aggression/armed rebellion; State Emergency/President's Rule (Article 356) when state government fails; Financial Emergency (Article 360) when financial stability is threatened.";
  
  // Amendment
  if (q.includes('amendment') && q.includes('368')) return "Article 368 provides the procedure for constitutional amendment. Most provisions require special majority (2/3 of members present and voting + majority of total membership). Some provisions also require ratification by half the states.";
  
  // Advanced concepts
  if (q.includes('doctrine of eclipse')) return "Pre-constitutional laws inconsistent with Fundamental Rights are not void but eclipsed. They remain dormant and can revive if the conflicting Fundamental Right is amended.";
  if (q.includes('severability')) return "Doctrine of Severability: If an unconstitutional part can be separated from constitutional parts, only the bad part is struck down, rest remains valid.";
  if (q.includes('pith and substance')) return "This doctrine examines the true character of a law. If it substantially falls within a legislature's competence, it's valid even if it incidentally touches another list.";
  if (q.includes('colourable legislation')) return "What cannot be done directly cannot be done indirectly. If a legislature disguises a law to appear within its power when it lacks competence, courts will examine the substance and strike it down.";
  if (q.includes('repugnancy')) return "Doctrine of Repugnancy (Article 254): When Union and State laws on Concurrent List conflict, Union law prevails. However, if State law has President's assent, it can override Union law in that state.";
  if (q.includes('territorial nexus')) return "A state can make laws with extra-territorial operation if there's sufficient territorial nexus between the state and the subject matter.";
  if (q.includes('occupied field')) return "If Parliament legislates on a Concurrent List subject, it occupies the field. State law on same subject cannot operate simultaneously unless it has President's assent.";
  
  // Landmark cases
  if (q.includes('kesavananda bharati')) return "Kesavananda Bharati v. State of Kerala (1973) established the Basic Structure Doctrine, holding that Parliament cannot amend the core foundational principles of the Constitution.";
  if (q.includes('maneka gandhi')) return "Maneka Gandhi v. Union of India (1978) established the 'Golden Triangle' of Articles 14, 19, and 21. Any law depriving liberty must be fair, just, reasonable, and non-arbitrary.";
  if (q.includes('minerva mills')) return "Minerva Mills v. Union of India (1980) struck down parts of 42nd Amendment, holding that balance between Fundamental Rights and DPSP is part of Basic Structure.";
  if (q.includes('bommai')) return "S.R. Bommai v. Union of India (1994) established that federalism and secularism are part of Basic Structure. Article 356 power is not absolute and is judicially reviewable.";
  if (q.includes('privacy')) return "Justice K.S. Puttaswamy v. Union of India (2017) declared Right to Privacy as a fundamental right under Article 21, protecting individual autonomy and dignity.";
  if (q.includes('triple talaq')) return "Shayara Bano v. Union of India (2017) declared instant triple talaq unconstitutional as arbitrary and violating Article 14. Led to Muslim Women (Protection of Rights on Marriage) Act, 2019.";
  if (q.includes('sabarimala')) return "Indian Young Lawyers Association v. State of Kerala (2018) held that excluding women aged 10-50 from Sabarimala temple violated Articles 14, 21, and 25. The practice was not an essential religious practice.";
  if (q.includes('navtej') || q.includes('377') || q.includes('homosexual')) return "Navtej Singh Johar v. Union of India (2018) decriminalized consensual homosexual acts, holding Section 377 IPC violated Articles 14, 21 (privacy, dignity, autonomy) and was irrational and arbitrary.";
  if (q.includes('aadhaar')) return "Justice K.S. Puttaswamy v. Union of India (Aadhaar case) upheld Aadhaar for welfare schemes and tax compliance using proportionality test, but struck down mandatory linking with bank accounts and mobile phones.";
  if (q.includes('njac')) return "Supreme Court Advocates-on-Record Association v. Union of India (2015) struck down NJAC Act for violating judicial independence (Basic Structure) by giving political executive decisive role in judicial appointments.";
  
  // Rights & freedoms
  if (q.includes('right to education')) return "Article 21A (added by 86th Amendment, 2002) makes free and compulsory education for children aged 6-14 a fundamental right. Implemented through RTE Act, 2009.";
  if (q.includes('right to information')) return "Right to Information is implicit in Article 19(1)(a) and Article 21. Codified by RTI Act, 2005, it allows citizens to access government information.";
  if (q.includes('reservation')) return "Articles 15(4), 15(5), and 16(4) allow reservations for SCs, STs, OBCs, and EWS in education and employment to ensure social justice and adequate representation. 103rd Amendment (2019) added 10% EWS quota.";
  if (q.includes('preventive detention')) return "Article 22 allows preventive detention to prevent potential crimes. Safeguards include: grounds must be communicated, right to representation, and maximum detention period as prescribed by law.";
  
  // Federal structure
  if (q.includes('federal') || q.includes('union list') || q.includes('state list') || q.includes('concurrent')) return "India has a quasi-federal structure. Seventh Schedule divides powers: Union List (97 subjects like defense, foreign affairs), State List (66 subjects like police, agriculture), Concurrent List (47 subjects like criminal law, education). Residuary powers with Union.";
  if (q.includes('governor')) return "Governor is the constitutional head of a state appointed by President for 5 years. After S.R. Bommai, Governor cannot dismiss a government arbitrarily; majority must be tested on assembly floor.";
  
  // Miscellaneous
  if (q.includes('secularism')) return "Secularism means the state has no official religion and treats all religions equally. Added to Preamble by 42nd Amendment. It's part of the Basic Structure (S.R. Bommai case).";
  if (q.includes('socialism')) return "Socialism in Indian context means social and economic equality, not state ownership of means of production. Added to Preamble by 42nd Amendment, it aims for a welfare state.";
  if (q.includes('ambedkar')) return "Dr. B.R. Ambedkar is the Father of the Indian Constitution. As Chairman of the Drafting Committee, he played the pivotal role in drafting the Constitution.";
  if (q.includes('constituent assembly')) return "The Constituent Assembly was formed in 1946 to draft the Constitution. It adopted the Constitution on November 26, 1949, which came into effect on January 26, 1950.";
  
  return null;
}
