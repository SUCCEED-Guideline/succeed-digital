const source = {
  citation: "Gogovor A, Légaré F, Moher D, Zomahoun HTV, Ben Charif A, Ekanmian G, McLean RKD, Milat A, Wolfenden L, Prévost K, Aubin E, Rochon P. SUCCEED guideline for reporting studies of scaling evidence-informed interventions, with explanations and examples. BMJ. 2026 Jul 17;394:e069389. doi:10.1136/bmj-2026-069389. Table 1, pp. 3–4.",
  doi: "https://doi.org/10.1136/bmj-2026-069389",
  table: "https://www.bmj.com/content/394/bmj-2026-069389.full.pdf#page=3",
  license: "https://creativecommons.org/licenses/by-nc/4.0/",
  osf: "https://osf.io/azm8u",
  equator: "https://equator-network.org/reporting-guidelines/succeed/index.html",
  version: "bmj-2026-069389-table-1",
  attribution: "Table 1 © 2026 the authors, reused under CC BY-NC 4.0 for noncommercial use. Recommendation text is unchanged. The digital layout, conditional indicators, and response fields are additions.",
  disclaimer: "Independent, unofficial reporting aid. Endorsement by the guideline authors, BMJ, or EQUATOR Network is not implied. Progress counts recorded responses and does not assess reporting or study quality.",
  footnote: "A fillable SUCCEED checklist is available in supplementary file S4 and the EQUATOR website (https://www.equator-network.org/)."
};

// Entries are [ID, Table 1 item label, verbatim recommendation, original subgroup, conditional cue].
const groups = [
  ["Title and abstract", [
    ["S1", "Study identification", "Compose a title that includes the study design, the intervention to be scaled, the population, and the condition or primary issue addressed.", "Title"],
    ["S2", "Abstract", "Provide an abstract that can be structured or not but should include background, study design, aim, methods, results, and conclusion. It should describe the intervention to be scaled, the primary issue it addresses, and the contexts (eg, high income countries/low and middle income countries, rural/urban) of both the original intervention and the scaling setting. It should justify scaling, name the scaling approach (eg, horizontal, vertical), target (population or setting), dimension (eg, number of sites/units), principal scaling strategy, main outcome/s, and dates of scaling implementation."]
  ]],
  ["Introduction", [
    ["S3a", "Scientific background", "State the research question and its scientific background (eg, the problem, challenge, or deficiency in healthcare or public health) that scaling the intervention addresses.", "Background"],
    ["S3b", "Justification", "Provide the justification for scaling: Why scale? What is the strength of the evidence? Weigh up positive and negative impacts. Who/what are the people and places that will be affected by scaling and how will they be affected? Does scaling address equity? Where relevant, indicate whether sex and/or gender differences may affect the impact of scaling.", "Background", true],
    ["S4", "Aim and objectives", "State the aim and objectives of the scaling study and, where applicable, the objectives of the intervention being scaled.", "", true]
  ]],
  ["Methods", [
    ["S5", "Study design", "Identify the study design chosen and why. Indicate where the protocol can be accessed, if available.", "", true],
    ["S6", "Theoretical framework", "Report the use of a theoretical framework, where applicable.", "", true],
    ["S7", "Targeted participants", "Describe the targeted units of scaling (who/what are the people, places, organisations, and/or other things that were targeted by the scaling process), and the associated eligibility criteria."],
    ["S8a", "Intervention", "Specify the context (eg, setting) where the evidence-informed health intervention to be scaled was developed.", "Context"],
    ["S8b", "Scaling", "Specify the context (eg, setting) of the scaling study.", "Context"],
    ["S9a", "Functions and forms of the health intervention", "Describe the health intervention, distinguishing between the adaptable periphery (forms) and core functions (ie, identifying modifiable, and non-modifiable elements). Be careful to distinguish the health intervention from the scaling strategy.", "Description of the evidence-informed health intervention"],
    ["S9b", "Scalability assessment", "Provide information on any evaluation of the potential of the health intervention for scaling, with appropriate bibliographic references. Provide a summary of key elements of the assessment (eg, acceptability, effectiveness).", "Description of the evidence-informed health intervention", true],
    ["S10", "Description and delivery of scaling strategy", "Describe the scaling approach (eg, horizontal or vertical), and the scaling strategy (ie, the plan for managing the scaling process). Describe the delivery (frequency, duration, intensity, mode), including targeted infrastructure, resource team, or organisation."],
    ["S11", "Engagement", "Document how the decision to scale the intervention was made and who is scaling it. Describe community partners in the scaling project and their respective roles. Document their levels of involvement, and their respective expectations. Report on how engagement was coordinated and if there was consensus."],
    ["S12a", "Health intervention", "Describe the outcomes of the health intervention being scaled.", "Outcomes"],
    ["S12b", "Scaling", "Describe the outcomes of the scaling strategy including the quantitative and/or qualitative definition of success, for example, coverage (reach, adoption), harm, impact, implementation, maintenance, fidelity, cost, barriers, and facilitators.", "Outcomes"],
    ["S13", "Analysis", "Describe the types of analysis pertaining to outcomes of both the health intervention and the scaling strategy, including relevant subgroup analyses. If numbers are sufficient, for equity purposes, consider sociocultural subgroup analyses (eg, context, age, sex, gender, education, ethnicity, income level, disability, and other intersecting factors).", "", true]
  ]],
  ["Results", [
    ["S14", "Participants", "Describe the essential characteristics of the participants (actors, targeted recipients) at different levels of study involvement. Report on size of community organisations and whether for-profit or not; age, sex, gender, income, education, ethnicity of individuals (eg, patients, health professionals); roles and disciplines in leadership teams. If relevant, subject participant data should be presented disaggregated by age, sex, gender, and other intersecting factors.", "", true],
    ["S15a", "Effectiveness of the scaled health intervention", "Report the effectiveness outcomes of the scaled health intervention, if measured. Comparisons with outcomes of the original intervention should be reported, where applicable.", "Outcomes", true],
    ["S15b", "Scaling", "Report on outcomes specific to the scaling strategy, for example, effective coverage (adoption, reach), implementation, and equity, using the appropriate numerators and denominators where feasible. Barriers and facilitators of scaling should also be reported.", "Outcomes", true],
    ["S15c", "Cost/economic analysis", "Document the cost of the health intervention and the cost of scaling it."],
    ["S15d", "Fidelity and adaptation", "Report fidelity to core functions of the health intervention and planned scaling strategy. Document reasons for and impact of any adaptations to the original intervention for different target populations, localities, or organisational cultures.", "", true],
    ["S15e", "Unintended consequences", "Report unintended consequences such as unexpected benefits, harms, failures or costs."],
    ["S15f", "Sustainability", "Specify sustainability factors and mechanisms put in place to support sustainability after scaling."]
  ]],
  ["Discussion", [
    ["S16a", "Summary of results", "Summarise key results related to the primary outcome and success or failure of scaling."],
    ["S16b", "Explanation of results", "Explain important results and compare them to results of the original intervention, to results in similar scaling studies, and to other relevant evidence. Where applicable, reflect on adaptations or trade-offs made for optimal scale.", "", true],
    ["S16c", "Study limitations", "Discuss limitations of the study."],
    ["S16d", "Implications", "Mention any implications of the scaling strategy and/or health intervention for policy and practice."]
  ]],
  ["Other information", [
    ["S17a", "Funding source", "Mention the sources of funding that supported the study and their role, if any.", "", true],
    ["S17b", "Conflict of interest", "State potential interests of individuals in the outcomes of the study and any conflict of interest."],
    ["S17c", "Ethics review", "Report whether the study was approved by a research ethics committee. Identify the review committee(s) or justify any waiver.", "", true],
    ["S18a", "Registration", "Indicate if the study is registered and give registration details if applicable (eg, registry name, registration number or identifier).", "Open science practices", true],
    ["S18b", "Data sharing", "Indicate whether study data will be available and how it can be accessed.", "Open science practices"]
  ]]
];
