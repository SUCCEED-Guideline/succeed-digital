// Explanation passages from the supplied SUCCEED explanation document. PDF whitespace normalized.
const explanations = {
  "S1": {
    "text": "The identification of the study design in the title facilitates appropriate indexing in bibliographic databases, searching, and ensures ease of identification of randomized trials for potential inclusion in evidence synthesis products.2",
    "page": 2,
    "pages": "2"
  },
  "S2": {
    "text": "A systematic review found that scaling-up strategies were poorly defined in the majority of primary studies.4 As the abstract serves as a quick overview to help readers determine the relevance of the paper to their interests or research, it should include not only the intervention being scaled and the scaling target but also the scaling approach and main strategy. Additionally, it should include the main outcomes (e.g., adoption5).",
    "page": 2,
    "pages": "2–3"
  },
  "S3a": {
    "text": "The scientific background should address not just the research question that drove the original health intervention, but also that drives the scaling effort. The way these research questions are formulated should match the outcome variables.",
    "page": 4,
    "pages": "4"
  },
  "S3b": {
    "text": "Scaling is a choice that must be justified. It can amplify risks as well as benefits. The choice to scale is made by weighing up the evidence alongside the values shared by interested parties. 7 Reporting the influence of contextual factors (e.g., social, institutional or economic) could contribute to justifying the choice to scale.8",
    "page": 5,
    "pages": "5"
  },
  "S4": {
    "text": "It is important (and sometimes difficult) to distinguish between the aims and objectives of the scaling initiative — which are to broaden the reach and impact of evidence-informed interventions so as to optimize their benefits (typically assessed in terms of implementation, service, or system- level outcomes) — and those of the health intervention being scaled , which are generally to improve individual -level health or well -being ( typically assessed by measures of disease, condition, or health risk).4, 9",
    "page": 6,
    "pages": "6–7"
  },
  "S5": {
    "text": "Study designs reported in a systematic review of scaling studies suggest that the most common designs were before-and-after studies, non -randomized controlled trials, and randomized controlled trials.4 Inclusion of information related to the design is needed to assess the suitability of theselected research design for the research question posed in the study, and to appraise any possible biases in the outcome data. 11 The authors could refer to specific reporting guidelines pertaining to the study design used for additional reporting recommendations.12",
    "page": 7,
    "pages": "7"
  },
  "S6": {
    "text": "Reporting also involves explaining how theory guided the scaling strategy design, implementation, and evaluation.12, 13 The use of theory and frameworks in the design of research studies can support the advancement of scaling science. A range of scaling theories and frameworks has been published.14-16 Authors should explain how theory guided the design of the scaling study, including theselection of the intervention to be scaled, the development of scaling strategies, theselection of study measures, and the evaluation approach. This may not be relevant in some circumstances, e.g., practical reports.",
    "page": 7,
    "pages": "7–8"
  },
  "S7": {
    "text": "Scaling studies may include participants recruited at multiple levels. These include individuals who are the target of the health intervention, such as patients who are intended recipients of a new therapy to be scaled, as well as organizational units, such as hospitals responsible for delivering the intervention. In the case of organizational units, participants may include individuals who can report on behalf of the unit — for example, hospital administrators or clinicians working within a hospital where a new therapy is being introduced as part of a scaling effort. Accurate description of the targeted units or recipients of the scaling will facilitate reporting of outcomes related to success, harm, and unintended consequences.18",
    "page": 8,
    "pages": "8"
  },
  "S8a": {
    "text": "The context of the intervention refers to a set of active and unique characteristics or circumstances of thesetting where the intervention was initially developed and tested prior to its scaling. Context can consist of both physical and non -physical factors e.g., sociocultural, socioeconomic, geographical, legal, political or health-system related.13, 19 The presentation of this information can enable an assessment of the amenability of the context in which the intervention is to be scaled to the context in which it was developed.",
    "page": 9,
    "pages": "9"
  },
  "S8b": {
    "text": "The success of scaling is highly context -dependent, particularly for complex and multi -faceted health interventions. Contextual scaling factors should be described, and any differences from the original intervention context should be documented. Of particular importance are contextual factors within the organizational units (e.g., hospitals) where the scaling efforts occur.",
    "page": 9,
    "pages": "9"
  },
  "S9a": {
    "text": "Inherent in the process of scaling is the exposure of health interventions to a broader and more diverse range of organizations, populations, and individuals. This may necessitate the adaptation of interventions to ensure they can be delivered more feasibly, effectively, and appropriately to benefit these diverse groups. However, adaptation may negatively affect intervention outcomes if components critical to their effectiveness are removed. As such, it is important to identify the core functions of the health intervention (its essential and indispensable elements), and also its forms, the adaptable periphery, which are elements that can be adapted to fit the organization or context in which it is being scaled.20, 21, 22-24",
    "page": 10,
    "pages": "10"
  },
  "S9b": {
    "text": "Scalability refers to the “ability of a health intervention—shown to be efficacious on a small scale and/or under controlled conditions—to be expanded under real-world conditions to reach a greater proportion of the eligible population while retaining its effectiveness”.25 It also includes assessing whether the health intervention can be replicated, transferred, or sustained.26 Assessing scalability is a fundamental step in any scaling process. It helps avoid scaling health interventions that have a low likelihood of success, may cause harm, or lead to unnecessary expenditure of resources and efforts. Scalability assessments target certain key components or properties of the intervention that are critical for scaling but are often overlooked, such as evidence of beneficial impact.25-30 Specify the scalability assessment tool used, if applicable.",
    "page": 11,
    "pages": "11"
  },
  "S10": {
    "text": "Thoroughly describing each component of the scaling strategy and its delivery allows readers to assess how these may have affected outcomes; and allows replication of successful scaling strategies. Vertical approach refers to “ the policy, political, legal, regulatory, budgetary or other health systems changes needed to institutionalize the [intervention] at the national or sub -national level” while in horizontal approach, interventions “may be replicated in different geographic sites or can be extended to serve larger or different population groups”.28 The use of checklists, such as TIDieR where relevant, will support the reporting and description of scaling strategies in a comprehensive and consistent manner.12",
    "page": 11,
    "pages": "11–12"
  },
  "S11": {
    "text": "Actors (initiators, enablers, competitors, impacted populations) engaged in planning a scaling project may have different expectations about the health intervention to be scaled. 7 Expectations may differ regarding the geographic areas for expansion, the level of service delivery, the target populations or the desired pace of scaling.31 Details about how all relevant actors were involved in the development of the health intervention, in decisions about whether or not to scale, and in the scaling process will provide readers with important context for interpreting the study findings. This includes information on who is driving or primarily responsible for the scaling plan, who is delivering the scaling strategy, and how these actors are engaged and their activities coordinated— for example, through governance structures and decision-making processes.",
    "page": 13,
    "pages": "13"
  },
  "S12a": {
    "text": "An accurate description of the components of the health intervention will help describe its outcomes. These could include service and clinical effectiveness outcomes, behaviour change, or health outcomes such as symptomatology, mortality, or quality of life.33",
    "page": 14,
    "pages": "14"
  },
  "S12b": {
    "text": "The intended outcomes that scaling is expected to achieve —so that health -related outcomes can materialize—should be specified. Data on scaling outcomes should be gathered from various sources, including questionnaires, interviews, observations, records and electronic devices [NLM Data collection MeSH term]. Understanding how different contexts vary with respect to available resources, levels of expertise and commitment to the intervention as well as consistency of delivery is critical to scaling outcomes ; the cost of the intervention and implementation will influence adoption and sustainability.5, 34",
    "page": 14,
    "pages": "14"
  },
  "S13": {
    "text": "The way the research problem and objectives are formulated will determine which intersecting variables are required for analysis and the appropriate analytical approaches . In scaling efforts, other important categories, factors and relationships may emerge in the process of scaling.7, 35, 36",
    "page": 15,
    "pages": "15"
  },
  "S14": {
    "text": "Data should be routinely presented disaggregated by sex, gender, and other intersecting factors regardless of the sample size. The description pertains to the participants exposed to the health intervention (e.g., individuals) and/or the scaling strategies (e.g., organizations). Disaggregated data and subgroup analyses should be reported regardless of positive or negative outcomes. This information can help (1) identify disparities in outcomes and experiences for different groups of people; (2) monitor progress towards specific goals or targets; (3) develop tailored policies and interventions; (4) ensure equity in policy and decision -making by addressing the needs of all groups. Presenting disaggregated data and performing subgroup analyses are essential tools for understanding and addressing inequalities and disparities within populations, particularly those that are historically marginalized or underrepresented in research. 35, 37-39 Authors should use the terms sex (biological: male, female, other) and gender (socio -cultural: man, woman, other) carefully in order to avoid confusion. 40 Where applicable, describe who delivered the health intervention and their relationship (if any) to the recipients or recipients’ community.18",
    "page": 15,
    "pages": "15–16"
  },
  "S15a": {
    "text": "The effectiveness of interventions in improving health outcomes can be substantially reduced when scaled, compared to trials that were not conducted at scale.41, 42",
    "page": 17,
    "pages": "17"
  },
  "S15b": {
    "text": "Outcomes specific to the scaling strategy include service and clinical effectiveness, e.g., improvements at individual and population levels. 33 Identifying barriers and facilitators related to the scaling strategy, whether in terms of resource constraints, workforce capacity, or regulatory issues, can help others assess whether the intervention could scale successfully in their own contexts and clarify which mechanisms supported or inhibited the scaling of the intervention.27, 43, 44",
    "page": 17,
    "pages": "17"
  },
  "S15c": {
    "text": "Where possible, documenting the cost of the health intervention and of scaling it can influence adoption, fundability and sustainability. The project team should differentiate between recurring fixed costs, variable costs and one -time capital costs. Projects should attempt to quantify any in - kind contributions they may receive from other organizations, and identify cost -share opportunities, differentiating between costs that will be covered by the project team itself and costs that may be covered by other interested parties.39 Describe any co-payments required by patients, who benefited/lost out if there were savings to the health system, and who met each cost category. Report whether scaling happened under market conditions. If feasible and appropriate , formal economic appraisal should be applied to scaling processes including cost effectiveness analysis, cost benefit analysis and cost utility analysis.",
    "page": 18,
    "pages": "18–19"
  },
  "S15d": {
    "text": "Fidelity refers to the extent to which the scaling strategy and the core functions of the health intervention are delivered/maintained as intended in the real world. Existing systems for monitoring and evaluating health intervention delivery are rarely capable of capturing issues relevant to the process and outcomes of moving an intervention to scale.24, 46-48 Because scaling generates dynamic change, it requires dynamic evaluation, i.e. from start to finish. 7 Report adaptations made to ensure scaling was successful, why, how, and what was found.49",
    "page": 20,
    "pages": "20"
  },
  "S15e": {
    "text": "Scaling can amplify harms as well as benefits at the individual, scaling unit (organizational) or other level. Evidence of the risks, feasibility and acceptability in one context may not be sufficient to support its implementation on a wider scale, thus the plan to scale the health intervention must explicitly predict or record harmful effects and risks, closely monitor them at the implementation phase, and take immediate steps to reduce or mitigate them.50, 51",
    "page": 20,
    "pages": "20"
  },
  "S15f": {
    "text": "One of the least reported outcomes is the extent to which an intervention or policy is maintained. Maintenance reflects the extent to which an intervention becomes institutionalized or part of routine organizational practices and policies. There are multiple reasons for this gap in reporting, including lack of planning for sustainability, publication challenges, and limited funding periods. An intervention almost never remains the same as it was during its initial implementation, but changes over time (thus the importance of identifying 'core functions' of the health innovation). Sustainability has variously been termed evolvability or dynamic sustainability and, when applied to different settings, transportability. Most importantly, the health and population impacts brought about when the program operates at scale must be sustained for true progress.5, 53, 54",
    "page": 21,
    "pages": "21"
  },
  "S16a": {
    "text": "The goal of the summary is to capture the major findings relative to the study aims and create a bridge to a more nuanced exploration of those findings.55",
    "page": 22,
    "pages": "22"
  },
  "S16b": {
    "text": "The discussion should contextualize the findings of the study within the results of a comprehensive literature search. It should weigh benefits and harms of scaling . “Optimal scale” is based on the premise that more is not necessarily better; thus, the scaling process should balance magnitude, variety, sustainability, and equity of impacts in ways populations can endorse.7, 34, 51",
    "page": 22,
    "pages": "22"
  },
  "S16c": {
    "text": "This is particularly important regarding delivery consistency for scaling strategies and fidelity to the health intervention core components/functions (if measured).",
    "page": 23,
    "pages": "23"
  },
  "S16d": {
    "text": "It is important to comment on how scaling strategies and health interventions are not only effective but also equitable, sustainable, and impactful in diverse settings. The potential implications of sex, gender and other intersecting factors on the study results and analyses should be discussed, or the implications of the lack of such analyses.8, 40",
    "page": 24,
    "pages": "24"
  },
  "S17a": {
    "text": "The role of each funding source should be described in sufficient detail to allow readers to assess whether these external parties may have influenced the reporting of improvement outcomes.55",
    "page": 24,
    "pages": "24"
  },
  "S17b": {
    "text": "When there are financial interests in research studies there is concern that these relationships may influence research outcomes. Resolving issues of conflict of interest is not best accomplished by avoiding all relationships. To protect research integrity and maintain public trust in research, it is important that potential financial conflicts of interest are disclosed, and steps are taken, where indicated, to manage their effects.56, 57",
    "page": 25,
    "pages": "25"
  },
  "S17c": {
    "text": "An application number or reference number of the ethical approval should also be reported. If a study is deemed exempt from review by a research ethics committee, this should be reported together with a clear justification of the exemption from review.34",
    "page": 25,
    "pages": "25"
  },
  "S18a": {
    "text": "Given the growth of open science in recent years and in accordance with recommended practices, registration details in appropriate trial registries or repositories should be included.",
    "page": 26,
    "pages": "26"
  },
  "S18b": {
    "text": "An increasing number of funding agencies are requiring data management plans including data sharing statements.60, 61 Information on the data available and its usability are needed for quality control and for an individual to determine not just if data can be used, but whether it should be used for the intended purpose.62",
    "page": 26,
    "pages": "26"
  }
};
