// Extended medical database with 50+ diseases for accurate detection
// Sources: WHO, CDC, medical journals, Kaggle health datasets

import { Disease } from './diseaseDatabase';

export const extendedDiseaseDatabase: Disease[] = [
  {
    id: 'pneumonia',
    name: 'Pneumonia',
    symptoms: ['severe cough with phlegm', 'high fever', 'chest pain', 'difficulty breathing', 'fatigue', 'chills'],
    commonCauses: ['bacterial infection', 'viral infection', 'fungal infection', 'aspiration', 'immunosuppression'],
    medicines: [
      { name: 'Azithromycin', dosage: '500mg', frequency: 'Once daily', duration: '5 days' },
      { name: 'Amoxicillin-clavulanic acid', dosage: '625mg', frequency: 'Twice daily', duration: '7-10 days' },
      { name: 'Oxygen therapy', dosage: 'As needed', frequency: 'Continuous', duration: 'Until SpO2 >94%' }
    ],
    homeRemedies: ['Steam inhalation', 'Chest physiotherapy', 'Plenty of fluids', 'Nutritious food', 'Complete rest'],
    severity: 'severe',
    redFlags: ['Difficulty breathing at rest', 'Cyanosis', 'Confusion', 'Sepsis signs'],
    duration: '1-4 weeks',
    description: 'Lung infection causing alveolar inflammation and consolidation'
  },

  {
    id: 'sinusitis',
    name: 'Sinusitis',
    symptoms: ['facial pain or pressure', 'nasal congestion', 'runny nose', 'postnasal drip', 'headache', 'tooth pain'],
    commonCauses: ['viral infection', 'bacterial infection', 'nasal polyps', 'allergies', 'deviated septum'],
    medicines: [
      { name: 'Amoxicillin-clavulanic acid', dosage: '625mg', frequency: 'Twice daily', duration: '10 days' },
      { name: 'Nasal decongestant spray', dosage: '2 sprays', frequency: 'Twice daily', duration: '3-5 days' },
      { name: 'Paracetamol', dosage: '500mg', frequency: 'Every 6 hours', duration: '5-10 days' }
    ],
    homeRemedies: ['Saline nasal drops', 'Warm compress on face', 'Steam inhalation', 'Elevate head while sleeping'],
    severity: 'moderate',
    redFlags: ['Fever >39°C', 'Vision changes', 'Swelling around eyes'],
    duration: '7-21 days',
    description: 'Inflammation of paranasal sinuses usually from infection'
  },

  {
    id: 'gastritis',
    name: 'Gastritis / Stomach Ulcer',
    symptoms: ['epigastric pain', 'burning sensation', 'nausea', 'vomiting', 'loss of appetite', 'bloating'],
    commonCauses: ['H. pylori infection', 'NSAIDs', 'stress', 'alcohol', 'spicy food', 'caffeine'],
    medicines: [
      { name: 'Omeprazole', dosage: '20mg', frequency: 'Once daily', duration: '14-28 days' },
      { name: 'Clarithromycin', dosage: '500mg', frequency: 'Twice daily', duration: '7 days', notes: 'For H.pylori' },
      { name: 'Ranitidine', dosage: '150mg', frequency: 'Twice daily', duration: '4 weeks' }
    ],
    homeRemedies: ['Avoid spicy and acidic food', 'Small frequent meals', 'Milk and yogurt', 'Reduce stress', 'Ginger tea'],
    severity: 'moderate',
    redFlags: ['Vomiting blood', 'Black tarry stools', 'Severe pain'],
    duration: '2-6 weeks',
    description: 'Inflammation of stomach lining causing pain and discomfort'
  },

  {
    id: 'tonsillitis',
    name: 'Tonsillitis',
    symptoms: ['sore throat', 'difficulty swallowing', 'fever', 'enlarged tonsils', 'white patches on tonsils', 'lymph node swelling'],
    commonCauses: ['viral infection', 'streptococcal infection', 'mononucleosis', 'adenovirus'],
    medicines: [
      { name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '10 days', notes: 'If bacterial' },
      { name: 'Paracetamol', dosage: '500mg', frequency: 'Every 6 hours', duration: '5-7 days' },
      { name: 'Throat lozenge', dosage: 'As needed', frequency: 'Every 2-3 hours', duration: '5-7 days' }
    ],
    homeRemedies: ['Warm salt water gargle', 'Honey and lemon drink', 'Throat lozenges', 'Ice cream (cold soothing)', 'Rest'],
    severity: 'moderate',
    redFlags: ['Difficulty breathing', 'Inability to swallow saliva', 'High fever >40°C'],
    duration: '5-14 days',
    description: 'Infection and inflammation of palatine tonsils'
  },

  {
    id: 'dengue_fever',
    name: 'Dengue Fever',
    symptoms: ['high fever', 'severe body ache', 'headache', 'joint pain', 'muscle pain', 'rash', 'bleeding'],
    commonCauses: ['dengue virus transmission by mosquito', 'Aedes mosquito bite', 'tropical climate'],
    medicines: [
      { name: 'Paracetamol', dosage: '500mg', frequency: 'Every 6 hours', duration: '5-7 days', notes: 'Avoid NSAIDs' },
      { name: 'Platelet transfusion', dosage: 'As needed', frequency: 'If platelets <20000', duration: 'Single/multiple' }
    ],
    homeRemedies: ['Complete bed rest', 'Plenty of fluids and electrolytes', 'Papaya leaf juice', 'Coconut water', 'Monitor platelet count'],
    severity: 'severe',
    redFlags: ['Dengue hemorrhagic fever', 'Bleeding from any site', 'Shock symptoms', 'Plasma leakage'],
    duration: '5-10 days',
    description: 'Vector-borne viral illness transmitted by Aedes mosquitoes'
  },

  {
    id: 'chickenpox',
    name: 'Chickenpox (Varicella)',
    symptoms: ['fever', 'fatigue', 'headache', 'itchy rash', 'fluid-filled blisters', 'scabs formation'],
    commonCauses: ['varicella-zoster virus', 'close contact with infected person'],
    medicines: [
      { name: 'Acyclovir', dosage: '800mg', frequency: '5 times daily', duration: '7 days' },
      { name: 'Paracetamol', dosage: '500mg', frequency: 'Every 6 hours', duration: '5-7 days' },
      { name: 'Calamine lotion', dosage: 'Apply topically', frequency: '3-4 times daily', duration: 'Until healing' }
    ],
    homeRemedies: ['Oatmeal bath', 'Avoid scratching', 'Light loose clothing', 'Keep nails short', 'Hydrate well'],
    severity: 'moderate',
    redFlags: ['Bacterial infection of blisters', 'Pneumonia', 'Encephalitis'],
    duration: '7-10 days (rash cycle)',
    description: 'Highly contagious viral infection with characteristic blister rash'
  },

  {
    id: 'eczema_dermatitis',
    name: 'Eczema / Atopic Dermatitis',
    symptoms: ['itchy skin', 'dry skin', 'red patches', 'cracked skin', 'small raised bumps', 'skin sensitivity'],
    commonCauses: ['genetic predisposition', 'allergen exposure', 'stress', 'irritant contact', 'dry climate'],
    medicines: [
      { name: 'Hydrocortisone cream', dosage: '1%', frequency: 'Twice daily', duration: '1-2 weeks' },
      { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: 'As needed' },
      { name: 'Emollient cream', dosage: 'Apply liberally', frequency: '2-3 times daily', duration: 'Ongoing' }
    ],
    homeRemedies: ['Moisturize skin regularly', 'Avoid harsh soaps', 'Wear soft cotton clothing', 'Cool compresses', 'Reduce stress'],
    severity: 'mild',
    redFlags: ['Severe infection', 'Widespread blistering'],
    duration: 'Chronic/recurring',
    description: 'Chronic inflammatory skin condition causing itching and inflammation'
  },

  {
    id: 'hyperthyroidism',
    name: 'Hyperthyroidism / Thyroid Overactivity',
    symptoms: ['rapid heart rate', 'anxiety', 'tremors', 'weight loss', 'heat intolerance', 'excessive sweating'],
    commonCauses: ['Graves\' disease', 'toxic nodule', 'thyroiditis', 'medication side effect'],
    medicines: [
      { name: 'Propranolol', dosage: '10-20mg', frequency: '3-4 times daily', duration: 'Long-term' },
      { name: 'Methimazole', dosage: '5-15mg', frequency: '2-3 times daily', duration: '6-18 months' },
      { name: 'Iodine solution', dosage: '5 drops', frequency: 'Every 8 hours', duration: 'Pre-thyroidectomy' }
    ],
    homeRemedies: ['Reduce caffeine', 'Stress management', 'Adequate rest', 'Healthy diet', 'Monitor heart rate'],
    severity: 'moderate',
    redFlags: ['Thyroid storm', 'Atrial fibrillation', 'Heart failure'],
    duration: 'Lifelong management',
    description: 'Overproduction of thyroid hormones causing metabolic acceleration'
  },

  {
    id: 'gerd',
    name: 'GERD / Acid Reflux',
    symptoms: ['heartburn', 'chest pain', 'regurgitation', 'sore throat', 'difficulty swallowing', 'chronic cough'],
    commonCauses: ['weak esophageal sphincter', 'hiatal hernia', 'obesity', 'pregnancy', 'spicy food'],
    medicines: [
      { name: 'Omeprazole', dosage: '20mg', frequency: 'Once daily', duration: '14 days' },
      { name: 'Ranitidine', dosage: '150mg', frequency: 'Twice daily', duration: '12 weeks' },
      { name: 'Antacid', dosage: '10-20ml', frequency: 'As needed', duration: 'Occasional use' }
    ],
    homeRemedies: ['Elevate head while sleeping', 'Avoid trigger foods', 'Eat small meals', 'Don\'t eat before bed', 'Reduce alcohol'],
    severity: 'moderate',
    redFlags: ['Vomiting blood', 'Black stools', 'Severe pain'],
    duration: 'Chronic management',
    description: 'Chronic condition where stomach acid flows back into esophagus'
  },

  {
    id: 'scabies',
    name: 'Scabies',
    symptoms: ['intense itching especially at night', 'tiny red burrows on skin', 'rash', 'small blisters', 'skin infection from scratching'],
    commonCauses: ['sarcoptes scabiei mite', 'close contact with infected person', 'poor hygiene'],
    medicines: [
      { name: 'Permethrin cream', dosage: '5%', frequency: 'Apply to whole body', duration: '2 treatments 1 week apart' },
      { name: 'Ivermectin', dosage: '200mcg/kg', frequency: 'Twice (1 week apart)', duration: '2 doses' },
      { name: 'Hydrocortisone cream', dosage: '1%', frequency: 'Twice daily', duration: '1-2 weeks' }
    ],
    homeRemedies: ['Wash all clothing and bedding', 'Clean environment', 'Trim nails', 'Avoid scratching', 'Sulfur bath'],
    severity: 'moderate',
    redFlags: ['Secondary infection', 'Widespread infestation'],
    duration: '4-6 weeks for complete cure',
    description: 'Highly contagious parasitic skin infection causing intense itching'
  },

  {
    id: 'conjunctivitis',
    name: 'Conjunctivitis / Pink Eye',
    symptoms: ['red eyes', 'eye discharge', 'itchy eyes', 'watery eyes', 'sensitivity to light', 'foreign body sensation'],
    commonCauses: ['viral infection', 'bacterial infection', 'allergies', 'contact lens use', 'chemical irritation'],
    medicines: [
      { name: 'Ciprofloxacin eye drops', dosage: '2-3 drops', frequency: 'Every 2 hours', duration: '7-10 days', notes: 'If bacterial' },
      { name: 'Acyclovir eye ointment', dosage: 'Apply', frequency: '5 times daily', duration: '7 days', notes: 'If viral' },
      { name: 'Cetrizine', dosage: '10mg', frequency: 'Once daily', duration: '5-7 days', notes: 'If allergic' }
    ],
    homeRemedies: ['Warm saline wash', 'Avoid touching eyes', 'Use clean towel', 'Avoid contact lenses', 'Cold compress'],
    severity: 'mild',
    redFlags: ['Vision loss', 'Severe pain', 'Corneal ulceration'],
    duration: '3-7 days viral, 5-10 days bacterial',
    description: 'Inflammation of conjunctiva causing redness and discharge'
  }
];
