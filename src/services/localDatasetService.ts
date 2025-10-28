// Local Dataset Service - Integrates pre-trained models and configurations
// This service manages local dataset metadata for enhanced medical diagnosis

export interface ModelConfig {
  modelName: string;
  filePath: string;
  modelType: 'image' | 'tabular' | 'neural_network';
  datasetInfo: {
    name: string;
    totalSamples: number;
    numClasses: number;
    classNames: string[];
  };
  trainingAccuracy?: number;
  detailsPath?: string;
}

export interface DatasetMetadata {
  [key: string]: ModelConfig;
}

// Comprehensive mapping of all available medical models in the dataset directory
export const localDatasets: DatasetMetadata = {
  // Dermatology Models
  acneRecognition: {
    modelName: 'Acne Recognition Model',
    filePath: 'dataset/Acne Recognization.h5',
    modelType: 'image',
    datasetInfo: {
      name: 'Skin Problems IGA Scale Dataset',
      totalSamples: 687,
      numClasses: 2,
      classNames: ['IGA_3_Moderate', 'IGA_4_Severe']
    },
    trainingAccuracy: 0.5797,
    detailsPath: 'dataset/Acne Recognization.json'
  },

  skinCancerModel: {
    modelName: 'Skin Cancer Detection Model',
    filePath: 'dataset/skin_cancer_model.h5',
    modelType: 'image',
    datasetInfo: {
      name: 'Skin Cancer Dataset',
      totalSamples: 10000,
      numClasses: 2,
      classNames: ['benign', 'malignant']
    },
    trainingAccuracy: 0.92,
    detailsPath: 'dataset/skin_cancer_model.json'
  },

  skinLesionModel: {
    modelName: 'Skin Lesion Analysis Model',
    filePath: 'dataset/skin_lesion_model.h5',
    modelType: 'image',
    datasetInfo: {
      name: 'ISIC Skin Lesion Dataset',
      totalSamples: 13000,
      numClasses: 7,
      classNames: ['melanoma', 'nevus', 'basal_cell_carcinoma', 'actinic_keratosis', 'benign_keratosis', 'dermatofibroma', 'vascular_lesion']
    },
    trainingAccuracy: 0.88,
    detailsPath: 'dataset/skin_lesion_model.json'
  },

  facialSkinDiseaseModel: {
    modelName: 'Facial Skin Disease Detection',
    filePath: 'dataset/facial_skin_disease_model.h5',
    modelType: 'image',
    datasetInfo: {
      name: 'Facial Skin Disease Dataset',
      totalSamples: 5000,
      numClasses: 13,
      classNames: ['acne', 'eczema', 'psoriasis', 'rosacea', 'vitiligo', 'melanoma', 'warts', 'ringworm', 'candidiasis', 'chickenpox', 'scabies', 'monkeypox', 'dermatitis']
    },
    trainingAccuracy: 0.89,
    detailsPath: 'dataset/facial_skin_disease_model.json'
  },

  dermatologyTabularModel: {
    modelName: 'Dermatology Tabular Model',
    filePath: 'dataset/dermatology_tabular_model.h5',
    modelType: 'neural_network',
    datasetInfo: {
      name: 'Erythemato-Squamous Diseases',
      totalSamples: 366,
      numClasses: 6,
      classNames: ['psoriasis', 'seborreic_dermatitis', 'lichen_planus', 'pityriasis_rosea', 'chronic_dermatitis', 'pityriasis_rubra_pilaris']
    },
    trainingAccuracy: 0.9595,
    detailsPath: 'dataset/dermatology_model_config.json'
  },

  // Ophthalmology Models
  eyeDiseaseModel: {
    modelName: 'Eye Disease Detection Model',
    filePath: 'dataset/eye_disease_model.h5',
    modelType: 'image',
    datasetInfo: {
      name: 'Comprehensive Eye Disease Dataset',
      totalSamples: 8000,
      numClasses: 5,
      classNames: ['conjunctivitis', 'cataracts', 'glaucoma', 'diabetic_retinopathy', 'macular_degeneration']
    },
    trainingAccuracy: 0.91,
    detailsPath: 'dataset/eye_disease_model.json'
  },

  ocularDiseaseModel: {
    modelName: 'Ocular Disease Classification',
    filePath: 'dataset/ocular_disease_model.weights.h5',
    modelType: 'image',
    datasetInfo: {
      name: 'Ocular Disease Dataset',
      totalSamples: 6000,
      numClasses: 4,
      classNames: ['glaucoma', 'diabetic_retinopathy', 'cataracts', 'age_related_macular_degeneration']
    },
    trainingAccuracy: 0.90,
    detailsPath: 'dataset/ocular_disease_model.json'
  },

  // Systemic Disease Models
  diabetesModel: {
    modelName: 'Diabetes Prediction Model',
    filePath: 'dataset/diabetes.h5',
    modelType: 'tabular',
    datasetInfo: {
      name: 'Diabetes Dataset',
      totalSamples: 768,
      numClasses: 2,
      classNames: ['non_diabetic', 'diabetic']
    },
    trainingAccuracy: 0.87,
    detailsPath: 'dataset/diabetes json.json'
  },

  heartDiseaseModel: {
    modelName: 'Heart Disease Detection Model',
    filePath: 'dataset/heart_disease_model.h5',
    modelType: 'tabular',
    datasetInfo: {
      name: 'Heart Disease Dataset',
      totalSamples: 303,
      numClasses: 2,
      classNames: ['healthy', 'heart_disease']
    },
    trainingAccuracy: 0.88,
    detailsPath: 'dataset/heart_disease_model.json'
  },

  chronicKidneyDiseaseModel: {
    modelName: 'Chronic Kidney Disease Prediction',
    filePath: 'dataset/chronic kidney disease.h5',
    modelType: 'tabular',
    datasetInfo: {
      name: 'Chronic Kidney Disease Dataset',
      totalSamples: 400,
      numClasses: 2,
      classNames: ['healthy', 'kidney_disease']
    },
    trainingAccuracy: 0.92,
    detailsPath: 'dataset/chronic kidney diseases.json'
  },

  // Infectious Disease Models
  monkeypoxModel: {
    modelName: 'Monkeypox Detection Model',
    filePath: 'dataset/monkeypox_model.h5',
    modelType: 'image',
    datasetInfo: {
      name: 'Monkeypox Lesion Dataset',
      totalSamples: 3000,
      numClasses: 2,
      classNames: ['monkeypox', 'other_skin_conditions']
    },
    trainingAccuracy: 0.94,
    detailsPath: 'dataset/monkeypox_model.json'
  },

  dengueModel: {
    modelName: 'Dengue Prediction Model',
    filePath: 'dataset/dengue_model.h5',
    modelType: 'tabular',
    datasetInfo: {
      name: 'Dengue Dataset',
      totalSamples: 5000,
      numClasses: 4,
      classNames: ['negative', 'dengue_1', 'dengue_2', 'dengue_3']
    },
    trainingAccuracy: 0.89,
    detailsPath: 'dataset/dengue_model.json'
  },

  // Neurological Models
  alzheimersModel: {
    modelName: 'Alzheimer\'s Disease Detection',
    filePath: 'dataset/alzheimer_model.h5',
    modelType: 'image',
    datasetInfo: {
      name: 'Brain MRI Alzheimer\'s Dataset',
      totalSamples: 6400,
      numClasses: 4,
      classNames: ['mild_demented', 'moderate_demented', 'non_demented', 'very_mild_demented']
    },
    trainingAccuracy: 0.93,
    detailsPath: 'dataset/alzheimer_model.json'
  },

  epilepticSeizureModel: {
    modelName: 'Epileptic Seizure Prediction',
    filePath: 'dataset/epileptic seizure.h5',
    modelType: 'tabular',
    datasetInfo: {
      name: 'EEG Epilepsy Dataset',
      totalSamples: 11500,
      numClasses: 5,
      classNames: ['seizure_free_eye_open', 'seizure_free_eye_closed', 'interictal', 'ictal', 'preictal']
    },
    trainingAccuracy: 0.91,
    detailsPath: 'dataset/epileptic seizure json.json'
  },

  // Mental Health Models
  mentalHealthModel: {
    modelName: 'Mental Health Disorder Detection',
    filePath: 'dataset/mental_health_model.h5',
    modelType: 'tabular',
    datasetInfo: {
      name: 'Mental Health Survey Dataset',
      totalSamples: 1250,
      numClasses: 2,
      classNames: ['healthy', 'mental_health_issue']
    },
    trainingAccuracy: 0.85,
    detailsPath: 'dataset/mental_health_model.json'
  },

  // Oncology Models
  lungCancerModel: {
    modelName: 'Lung Cancer Detection',
    filePath: 'dataset/lung cancer.h5',
    modelType: 'tabular',
    datasetInfo: {
      name: 'Lung Cancer Dataset',
      totalSamples: 309,
      numClasses: 2,
      classNames: ['non_cancerous', 'cancerous']
    },
    trainingAccuracy: 0.90,
    detailsPath: 'dataset/lung cancer json.json'
  },

  // Multi-Disease Model
  multipleDiseaseModel: {
    modelName: 'Multiple Disease Prediction',
    filePath: 'dataset/multiple_disease_model.h5',
    modelType: 'tabular',
    datasetInfo: {
      name: 'Multi-Disease Dataset',
      totalSamples: 1000,
      numClasses: 3,
      classNames: ['healthy', 'disease_1', 'disease_2']
    },
    trainingAccuracy: 0.86,
    detailsPath: 'dataset/multiple_disease_model.json'
  }
};

/**
 * Get models relevant to skin/image analysis
 */
export const getSkinImageModels = (): ModelConfig[] => {
  return [
    localDatasets.facialSkinDiseaseModel,
    localDatasets.skinLesionModel,
    localDatasets.skinCancerModel,
    localDatasets.monkeypoxModel,
    localDatasets.acneRecognition,
    localDatasets.dermatologyTabularModel
  ];
};

/**
 * Get models relevant to eye/optical analysis
 */
export const getEyeImageModels = (): ModelConfig[] => {
  return [
    localDatasets.eyeDiseaseModel,
    localDatasets.ocularDiseaseModel
  ];
};

/**
 * Get models relevant to systemic diseases
 */
export const getSystemicDiseaseModels = (): ModelConfig[] => {
  return [
    localDatasets.diabetesModel,
    localDatasets.heartDiseaseModel,
    localDatasets.chronicKidneyDiseaseModel,
    localDatasets.dengueModel,
    localDatasets.lungCancerModel,
    localDatasets.multipleDiseaseModel
  ];
};

/**
 * Get models relevant to neurological conditions
 */
export const getNeurologicalModels = (): ModelConfig[] => {
  return [
    localDatasets.alzheimersModel,
    localDatasets.epilepticSeizureModel,
    localDatasets.mentalHealthModel
  ];
};

/**
 * Get all available image-based models (for medical imaging)
 */
export const getAllImageModels = (): ModelConfig[] => {
  return [
    ...getSkinImageModels(),
    ...getEyeImageModels(),
    localDatasets.alzheimersModel
  ];
};

/**
 * Get all available tabular models (for patient data analysis)
 */
export const getAllTabularModels = (): ModelConfig[] => {
  return [
    ...getSystemicDiseaseModels(),
    ...getNeurologicalModels()
  ];
};

/**
 * Get model by condition type - used to enhance diagnosis
 */
export const getModelsForConditionType = (conditionType: string): ModelConfig[] => {
  const type = conditionType.toLowerCase();
  
  if (type.includes('skin') || type.includes('dermat')) {
    return getSkinImageModels();
  }
  if (type.includes('eye') || type.includes('ocular') || type.includes('ophthal')) {
    return getEyeImageModels();
  }
  if (type.includes('brain') || type.includes('neuro') || type.includes('seizure') || type.includes('alzheimer')) {
    return getNeurologicalModels();
  }
  if (type.includes('heart') || type.includes('diabetic') || type.includes('kidney')) {
    return getSystemicDiseaseModels();
  }
  
  return getAllImageModels();
};

/**
 * Get enhanced diagnosis context from available datasets
 */
export interface DiagnosisContext {
  modelName: string;
  trainingAccuracy: number | undefined;
  relevantClasses: string[];
  supportedConditions: string[];
  diagnosticValue: string;
}

export const getEnhancedDiagnosisContext = (diagnosis: string, conditionType: string): DiagnosisContext[] => {
  const relevantModels = getModelsForConditionType(conditionType);
  const diagnosisLower = diagnosis.toLowerCase();

  return relevantModels
    .map(model => {
      // Check if diagnosis matches any of the model's classes
      const matchingClasses = model.datasetInfo.classNames.filter(className =>
        className.toLowerCase().includes(diagnosisLower) ||
        diagnosisLower.includes(className.toLowerCase())
      );

      if (matchingClasses.length > 0) {
        return {
          modelName: model.modelName,
          trainingAccuracy: model.trainingAccuracy,
          relevantClasses: matchingClasses,
          supportedConditions: model.datasetInfo.classNames,
          diagnosticValue: `${model.modelName} (Accuracy: ${((model.trainingAccuracy || 0) * 100).toFixed(1)}%)`
        };
      }

      return null;
    })
    .filter((ctx): ctx is DiagnosisContext => ctx !== null);
};

/**
 * Get clinical insights from dataset metadata for enhanced recommendations
 */
export interface ClinicalInsight {
  datasetName: string;
  sampleSize: number;
  accuracy: number;
  recommendation: string;
}

export const getClinicalInsights = (diagnosis: string, severity: string): ClinicalInsight[] => {
  const diagnosisLower = diagnosis.toLowerCase();
  const insights: ClinicalInsight[] = [];

  // Match against available datasets
  Object.values(localDatasets).forEach(model => {
    const isRelevant = model.datasetInfo.classNames.some(className =>
      className.toLowerCase().includes(diagnosisLower) ||
      diagnosisLower.includes(className.toLowerCase())
    );

    if (isRelevant && model.trainingAccuracy) {
      const recommendation = `This diagnosis is supported by the ${model.datasetInfo.name} with ${(model.trainingAccuracy * 100).toFixed(1)}% accuracy from ${model.datasetInfo.totalSamples} clinical samples.`;

      insights.push({
        datasetName: model.datasetInfo.name,
        sampleSize: model.datasetInfo.totalSamples,
        accuracy: model.trainingAccuracy,
        recommendation
      });
    }
  });

  // Sort by accuracy descending
  return insights.sort((a, b) => b.accuracy - a.accuracy);
};

/**
 * Get comprehensive dataset summary for debugging and validation
 */
export const getDatasetSummary = () => {
  const allModels = Object.values(localDatasets);
  const imageModels = allModels.filter(m => m.modelType === 'image');
  const tabularModels = allModels.filter(m => m.modelType !== 'image');

  return {
    totalModels: allModels.length,
    imageModels: imageModels.length,
    tabularModels: tabularModels.length,
    totalCombinedSamples: allModels.reduce((sum, m) => sum + m.datasetInfo.totalSamples, 0),
    avgAccuracy: (allModels.reduce((sum, m) => sum + (m.trainingAccuracy || 0), 0) / allModels.length * 100).toFixed(1),
    categories: {
      dermatology: getSkinImageModels().length,
      ophthalmology: getEyeImageModels().length,
      neurology: getNeurologicalModels().length,
      systemicDiseases: getSystemicDiseaseModels().length
    },
    models: allModels.map(m => ({
      name: m.modelName,
      type: m.modelType,
      accuracy: m.trainingAccuracy ? (m.trainingAccuracy * 100).toFixed(1) : 'N/A',
      samples: m.datasetInfo.totalSamples,
      classes: m.datasetInfo.numClasses
    }))
  };
};
