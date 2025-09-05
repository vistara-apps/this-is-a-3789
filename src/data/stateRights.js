// State-specific rights information for police interactions
export const stateRightsData = {
  'California': {
    stateCode: 'CA',
    guideContent: {
      title: 'Your Rights in California',
      summary: 'California has strong protections for citizens during police encounters.',
      rights: [
        {
          title: 'Right to Remain Silent',
          description: 'You have the right to remain silent and not answer questions beyond providing identification when required.',
          details: 'Under California law, you are not required to answer questions about where you are going, where you came from, or what you are doing.'
        },
        {
          title: 'Right to Record',
          description: 'You have the right to record police interactions in public spaces.',
          details: 'California Penal Code Section 148(g) explicitly protects your right to record police officers performing their duties in public.'
        },
        {
          title: 'Search and Seizure',
          description: 'Police need probable cause or a warrant to search you or your property.',
          details: 'You can clearly state "I do not consent to any searches" to establish your position.'
        },
        {
          title: 'Traffic Stops',
          description: 'During traffic stops, you must provide license, registration, and insurance upon request.',
          details: 'Passengers in vehicles are not required to provide identification unless there is reasonable suspicion of criminal activity.'
        }
      ],
      dosDonts: {
        dos: [
          'Remain calm and polite',
          'Keep your hands visible',
          'Ask "Am I free to leave?" if not under arrest',
          'Request a lawyer if arrested',
          'Remember badge numbers and patrol car numbers'
        ],
        donts: [
          'Don\'t resist, even if you believe the stop is unfair',
          'Don\'t argue or become confrontational',
          'Don\'t consent to searches',
          'Don\'t lie or provide false information',
          'Don\'t reach for anything without permission'
        ]
      }
    },
    scriptContent: {
      english: {
        'Traffic Stop': [
          'I am exercising my right to remain silent.',
          'I do not consent to any searches.',
          'Am I free to leave?',
          'I would like to speak to a lawyer.',
          'I am not resisting, but I do not consent.'
        ],
        'Street Encounter': [
          'Am I being detained or am I free to go?',
          'I am exercising my right to remain silent.',
          'I do not consent to any searches.',
          'I would like to contact my lawyer.',
          'I am recording this interaction for my safety.'
        ],
        'Home Visit': [
          'I do not consent to you entering my home.',
          'Do you have a warrant?',
          'I am exercising my right to remain silent.',
          'I would like to see your identification.',
          'I would like to speak to a lawyer before answering questions.'
        ]
      },
      spanish: {
        'Traffic Stop': [
          'Estoy ejerciendo mi derecho a permanecer en silencio.',
          'No consiento a ninguna búsqueda.',
          '¿Soy libre de irme?',
          'Me gustaría hablar con un abogado.',
          'No me estoy resistiendo, pero no consiento.'
        ],
        'Street Encounter': [
          '¿Estoy siendo detenido o soy libre de irme?',
          'Estoy ejerciendo mi derecho a permanecer en silencio.',
          'No consiento a ninguna búsqueda.',
          'Me gustaría contactar a mi abogado.',
          'Estoy grabando esta interacción por mi seguridad.'
        ],
        'Home Visit': [
          'No consiento que entren a mi casa.',
          '¿Tienen una orden judicial?',
          'Estoy ejerciendo mi derecho a permanecer en silencio.',
          'Me gustaría ver su identificación.',
          'Me gustaría hablar con un abogado antes de responder preguntas.'
        ]
      }
    }
  },
  'New York': {
    stateCode: 'NY',
    guideContent: {
      title: 'Your Rights in New York',
      summary: 'New York provides constitutional protections with specific state considerations.',
      rights: [
        {
          title: 'Right to Remain Silent',
          description: 'You have the constitutional right to remain silent during police encounters.',
          details: 'In New York, you are not required to answer questions beyond providing identification when lawfully requested.'
        },
        {
          title: 'Stop and Frisk',
          description: 'Police may stop and frisk you only with reasonable suspicion of criminal activity.',
          details: 'You can ask "What reasonable suspicion do you have?" and state "I do not consent to this search."'
        },
        {
          title: 'Recording Rights',
          description: 'You have the right to record police interactions in public spaces.',
          details: 'New York courts have consistently upheld the right to record police officers in public.'
        },
        {
          title: 'Identification Requirements',
          description: 'New York does not have a "stop and identify" statute.',
          details: 'You are not required to carry or show ID unless you are driving, arrested, or in certain regulated activities.'
        }
      ],
      dosDonts: {
        dos: [
          'Stay calm and respectful',
          'Keep your hands where officers can see them',
          'Ask if you are free to leave',
          'Request an attorney if arrested',
          'Remember officer details for later'
        ],
        donts: [
          'Don\'t physically resist',
          'Don\'t argue about the law during the encounter',
          'Don\'t consent to searches',
          'Don\'t provide false information',
          'Don\'t make sudden movements'
        ]
      }
    },
    scriptContent: {
      english: {
        'Traffic Stop': [
          'I am invoking my right to remain silent.',
          'I do not consent to any searches of my person or vehicle.',
          'Am I free to leave?',
          'I want to speak with an attorney.',
          'I am complying but not consenting.'
        ],
        'Street Encounter': [
          'Am I being detained or am I free to go?',
          'I am exercising my Fifth Amendment right to remain silent.',
          'I do not consent to any searches.',
          'What reasonable suspicion do you have?',
          'I want to contact my attorney.'
        ],
        'Home Visit': [
          'I do not consent to entry into my home.',
          'Do you have a search warrant?',
          'I am exercising my right to remain silent.',
          'May I see your badge and identification?',
          'I want to speak with my lawyer before answering questions.'
        ]
      },
      spanish: {
        'Traffic Stop': [
          'Estoy invocando mi derecho a permanecer en silencio.',
          'No consiento a ninguna búsqueda de mi persona o vehículo.',
          '¿Soy libre de irme?',
          'Quiero hablar con un abogado.',
          'Estoy cumpliendo pero no consintiendo.'
        ],
        'Street Encounter': [
          '¿Estoy siendo detenido o soy libre de irme?',
          'Estoy ejerciendo mi derecho de la Quinta Enmienda a permanecer en silencio.',
          'No consiento a ninguna búsqueda.',
          '¿Qué sospecha razonable tienen?',
          'Quiero contactar a mi abogado.'
        ],
        'Home Visit': [
          'No consiento la entrada a mi casa.',
          '¿Tienen una orden de cateo?',
          'Estoy ejerciendo mi derecho a permanecer en silencio.',
          '¿Puedo ver su placa e identificación?',
          'Quiero hablar con mi abogado antes de responder preguntas.'
        ]
      }
    }
  },
  'Texas': {
    stateCode: 'TX',
    guideContent: {
      title: 'Your Rights in Texas',
      summary: 'Texas law provides constitutional protections with specific state statutes.',
      rights: [
        {
          title: 'Right to Remain Silent',
          description: 'You have the right to remain silent under the Fifth Amendment.',
          details: 'Texas law does not require you to answer questions beyond providing identification when lawfully detained.'
        },
        {
          title: 'Identification Laws',
          description: 'Texas has a "failure to identify" statute (Penal Code 38.02).',
          details: 'You must provide your name, address, and date of birth if lawfully arrested or detained and asked by police.'
        },
        {
          title: 'Recording Rights',
          description: 'You have the right to record police interactions in public.',
          details: 'Texas Penal Code protects your right to record police officers performing official duties in public spaces.'
        },
        {
          title: 'Search and Seizure',
          description: 'Police need probable cause or consent to search you or your property.',
          details: 'You can refuse consent to searches and should clearly state your refusal.'
        }
      ],
      dosDonts: {
        dos: [
          'Remain calm and cooperative',
          'Provide required identification if lawfully detained',
          'Ask if you are free to leave',
          'Request an attorney if arrested',
          'Document the encounter when possible'
        ],
        donts: [
          'Don\'t resist or flee',
          'Don\'t argue or become hostile',
          'Don\'t consent to searches',
          'Don\'t provide false identification',
          'Don\'t interfere with police duties'
        ]
      }
    },
    scriptContent: {
      english: {
        'Traffic Stop': [
          'I am exercising my right to remain silent.',
          'I do not consent to any searches.',
          'Am I free to leave?',
          'I want to speak with my attorney.',
          'I am providing required identification only.'
        ],
        'Street Encounter': [
          'Am I being detained or am I free to go?',
          'I am exercising my right to remain silent.',
          'I do not consent to any searches.',
          'I will provide my identification if legally required.',
          'I want to contact my lawyer.'
        ],
        'Home Visit': [
          'I do not consent to entry.',
          'Do you have a warrant?',
          'I am exercising my right to remain silent.',
          'May I see your identification?',
          'I want my attorney present before answering questions.'
        ]
      },
      spanish: {
        'Traffic Stop': [
          'Estoy ejerciendo mi derecho a permanecer en silencio.',
          'No consiento a ninguna búsqueda.',
          '¿Soy libre de irme?',
          'Quiero hablar con mi abogado.',
          'Solo estoy proporcionando la identificación requerida.'
        ],
        'Street Encounter': [
          '¿Estoy siendo detenido o soy libre de irme?',
          'Estoy ejerciendo mi derecho a permanecer en silencio.',
          'No consiento a ninguna búsqueda.',
          'Proporcionaré mi identificación si es legalmente requerido.',
          'Quiero contactar a mi abogado.'
        ],
        'Home Visit': [
          'No consiento la entrada.',
          '¿Tienen una orden judicial?',
          'Estoy ejerciendo mi derecho a permanecer en silencio.',
          '¿Puedo ver su identificación?',
          'Quiero que mi abogado esté presente antes de responder preguntas.'
        ]
      }
    }
  },
  'Florida': {
    stateCode: 'FL',
    guideContent: {
      title: 'Your Rights in Florida',
      summary: 'Florida provides constitutional protections with specific state considerations.',
      rights: [
        {
          title: 'Right to Remain Silent',
          description: 'You have the constitutional right to remain silent.',
          details: 'Florida law does not require you to answer questions beyond providing identification when lawfully requested.'
        },
        {
          title: 'Stop and Identify',
          description: 'Florida does not have a general "stop and identify" statute.',
          details: 'You are not required to provide identification unless you are driving, arrested, or suspected of a specific crime.'
        },
        {
          title: 'Recording Rights',
          description: 'You have the right to record police in public spaces.',
          details: 'Florida courts have recognized the First Amendment right to record police officers in public.'
        },
        {
          title: 'Search Consent',
          description: 'You have the right to refuse consent to searches.',
          details: 'Police cannot search without probable cause, a warrant, or your consent. You can clearly refuse consent.'
        }
      ],
      dosDonts: {
        dos: [
          'Stay calm and polite',
          'Keep your hands visible',
          'Ask if you are free to leave',
          'Request a lawyer if arrested',
          'Remember details of the encounter'
        ],
        donts: [
          'Don\'t resist physically',
          'Don\'t argue during the encounter',
          'Don\'t consent to searches',
          'Don\'t lie or give false information',
          'Don\'t make threatening gestures'
        ]
      }
    },
    scriptContent: {
      english: {
        'Traffic Stop': [
          'I am invoking my right to remain silent.',
          'I do not consent to any searches.',
          'Am I free to leave?',
          'I would like to speak with an attorney.',
          'I am cooperating but not consenting.'
        ],
        'Street Encounter': [
          'Am I being detained or am I free to go?',
          'I am exercising my right to remain silent.',
          'I do not consent to any searches.',
          'I am recording this interaction.',
          'I want to contact my attorney.'
        ],
        'Home Visit': [
          'I do not consent to you entering my home.',
          'Do you have a search warrant?',
          'I am exercising my right to remain silent.',
          'May I see your identification and badge?',
          'I want to speak with my lawyer first.'
        ]
      },
      spanish: {
        'Traffic Stop': [
          'Estoy invocando mi derecho a permanecer en silencio.',
          'No consiento a ninguna búsqueda.',
          '¿Soy libre de irme?',
          'Me gustaría hablar con un abogado.',
          'Estoy cooperando pero no consintiendo.'
        ],
        'Street Encounter': [
          '¿Estoy siendo detenido o soy libre de irme?',
          'Estoy ejerciendo mi derecho a permanecer en silencio.',
          'No consiento a ninguna búsqueda.',
          'Estoy grabando esta interacción.',
          'Quiero contactar a mi abogado.'
        ],
        'Home Visit': [
          'No consiento que entren a mi casa.',
          '¿Tienen una orden de cateo?',
          'Estoy ejerciendo mi derecho a permanecer en silencio.',
          '¿Puedo ver su identificación y placa?',
          'Quiero hablar con mi abogado primero.'
        ]
      }
    }
  }
}

// List of all US states for the state selector
export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

// Get rights data for a specific state
export function getStateRights(state) {
  return stateRightsData[state] || null
}

// Get all available states with rights data
export function getAvailableStates() {
  return Object.keys(stateRightsData)
}

// Check if a state has detailed rights information
export function hasStateData(state) {
  return state in stateRightsData
}
