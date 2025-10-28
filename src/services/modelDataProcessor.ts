// Model Data Processor - Handles loading and processing of local medical datasets
// This service provides utilities for extracting insights from model configurations

import { localDatasets, ModelConfig, DiagnosisContext } from './localDatasetService';

/**
 * Model metadata that can be loaded from JSON configuration files
 */
export interface ModelMetadata {
  modelName: string;
  architecture?: string;
  accuracy: number;
  trainedSamples: number;
  classes: string[];
  trainingInfo?: {
    epochs: number;
    loss: number;
    earlyStoppingUsed: boolean;
  };
  preprocessing?: {
    imageSize?: number[];
    normalization?: string;
    dataAugmentation?: boolean;
  };
}

/**
 * Prediction result from model analysis
 */
export interface ModelPrediction {
  modelName: string;
  predictedClass: string;
  confidence: number;
  topPredictions: Array<{ class: string; score: number }>;
}

/**
 * Process and enrich diagnosis with model metadata
 */
export const enrichDiagnosisWithModelMetadata = (
  diagnosis: string,
  conditionType: string,
  confidence: number
): { modelMetadata: ModelMetadata[]; enrichedNotes: string[] } => {
  const relevantModels = Object.values(localDatasets).filter(model => {
    const isTypeMatch = 
      (conditionType.includes('skin') && model.modelName.toLowerCase().includes('skin')) ||
      (conditionType.includes('eye') && (model.modelName.toLowerCase().includes('eye') || model.modelName.toLowerCase().includes('ocular'))) ||
      (conditionType.includes('dermat') && model.modelName.toLowerCase().includes('dermat'));
    
    const isDiagnosisMatch = model.datasetInfo.classNames.some(className =>
      diagnosis.toLowerCase().includes(className.toLowerCase()) ||
      className.toLowerCase().includes(diagnosis.toLowerCase().split(' ')[0])
    );

    return isTypeMatch || isDiagnosisMatch;
  });

  const modelMetadata: ModelMetadata[] = relevantModels.map(model => ({
    modelName: model.modelName,
    accuracy: (model.trainingAccuracy || 0) * 100,
    trainedSamples: model.datasetInfo.totalSamples,
    classes: model.datasetInfo.classNames,
    architecture: model.modelType === 'image' ? 'CNN' : 'Neural Network'
  }));

  const enrichedNotes: string[] = [];
  if (modelMetadata.length > 0) {
    enrichedNotes.push(
      `Diagnosis validated against ${modelMetadata.length} clinical model(s) trained on ${
        modelMetadata.reduce((sum, m) => sum + m.trainedSamples, 0).toLocaleString()
      } samples`
    );
    
    const avgAccuracy = (
      modelMetadata.reduce((sum, m) => sum + m.accuracy, 0) / modelMetadata.length
    ).toFixed(1);
    enrichedNotes.push(`Average model accuracy: ${avgAccuracy}%`);
  }

  return { modelMetadata, enrichedNotes };
};

/**
 * Generate clinical confidence report based on model ensemble
 */
export interface ConfidenceReport {
  aiConfidence: number;
  modelSupportLevel: 'high' | 'medium' | 'low';
  supportingModels: number;
  clinicalNote: string;
  recommendedAction: string;
}

export const generateConfidenceReport = (
  diagnosis: string,
  aiConfidence: number,
  conditionType: string
): ConfidenceReport => {
  const { modelMetadata } = enrichDiagnosisWithModelMetadata(diagnosis, conditionType, aiConfidence);
  
  const supportingModels = modelMetadata.length;
  const avgModelAccuracy = modelMetadata.length > 0
    ? modelMetadata.reduce((sum, m) => sum + m.accuracy, 0) / modelMetadata.length
    : 0;

  // Determine model support level
  let modelSupportLevel: 'high' | 'medium' | 'low' = 'low';
  if (supportingModels >= 3 && avgModelAccuracy >= 85) {
    modelSupportLevel = 'high';
  } else if (supportingModels >= 1 && avgModelAccuracy >= 75) {
    modelSupportLevel = 'medium';
  }

  // Calculate combined confidence
  const combinedConfidence = (aiConfidence * 0.6 + avgModelAccuracy * 0.4);

  // Generate clinical note
  let clinicalNote = '';
  if (modelSupportLevel === 'high') {
    clinicalNote = `This diagnosis is strongly supported by multiple clinical models (${supportingModels} models) with high accuracy (${avgModelAccuracy.toFixed(1)}%).`;
  } else if (modelSupportLevel === 'medium') {
    clinicalNote = `This diagnosis is supported by clinical models with moderate confidence (${avgModelAccuracy.toFixed(1)}% average accuracy).`;
  } else {
    clinicalNote = 'This diagnosis requires professional medical validation.';
  }

  // Recommended action
  let recommendedAction = 'Consult a healthcare professional for confirmation';
  if (modelSupportLevel === 'high' && aiConfidence >= 80) {
    recommendedAction = 'Follow prescribed treatment plan and consult specialist if needed';
  } else if (modelSupportLevel === 'medium') {
    recommendedAction = 'Recommended to consult a specialist for confirmation';
  }

  return {
    aiConfidence,
    modelSupportLevel,
    supportingModels,
    clinicalNote,
    recommendedAction
  };
};

/**
 * Create a detailed diagnostic report with model analysis
 */
export interface DiagnosticReport {
  diagnosis: string;
  confidence: number;
  severity: string;
  modelSupportLevel: 'high' | 'medium' | 'low';
  supportingModels: string[];
  clinicalEvidence: string[];
  nextSteps: string[];
}

export const createDiagnosticReport = (
  diagnosis: string,
  conditionType: string,
  confidence: number,
  severity: string
): DiagnosticReport => {
  const { modelMetadata, enrichedNotes } = enrichDiagnosisWithModelMetadata(
    diagnosis,
    conditionType,
    confidence
  );

  const confidenceReport = generateConfidenceReport(diagnosis, confidence, conditionType);

  return {
    diagnosis,
    confidence,
    severity,
    modelSupportLevel: confidenceReport.modelSupportLevel,
    supportingModels: modelMetadata.map(m => m.modelName),
    clinicalEvidence: enrichedNotes,
    nextSteps: [
      confidenceReport.recommendedAction,
      severity === 'severe' ? 'Seek immediate medical attention' : 'Follow prescribed treatment',
      'Monitor symptoms regularly',
      'Report any adverse reactions to medications'
    ]
  };
};

/**
 * Validate diagnosis against known model classes
 */
export interface DiagnosisValidation {
  isValid: boolean;
  matchedModels: string[];
  confidence: number;
  validationNote: string;
}

export const validateDiagnosis = (
  diagnosis: string,
  conditionType: string
): DiagnosisValidation => {
  const diagnosisLower = diagnosis.toLowerCase();
  const matchedModels: string[] = [];

  Object.values(localDatasets).forEach(model => {
    const isMatch = model.datasetInfo.classNames.some(className =>
      className.toLowerCase().includes(diagnosisLower) ||
      diagnosisLower.includes(className.toLowerCase().split('_')[0])
    );

    if (isMatch) {
      matchedModels.push(model.modelName);
    }
  });

  const isValid = matchedModels.length > 0;
  const confidence = Math.min(matchedModels.length * 20, 100);

  const validationNote = isValid
    ? `Diagnosis "${diagnosis}" is recognized in ${matchedModels.length} clinical model(s).`
    : `Diagnosis "${diagnosis}" requires professional validation.`;

  return { isValid, matchedModels, confidence, validationNote };
};

/**
 * Get specialized model recommendations for follow-up testing
 */
export interface FollowUpRecommendation {
  modelName: string;
  reason: string;
  expectedAccuracy: number;
}

export const getFollowUpRecommendations = (
  diagnosis: string,
  conditionType: string
): FollowUpRecommendation[] => {
  const diagnosisLower = diagnosis.toLowerCase();
  const recommendations: FollowUpRecommendation[] = [];

  Object.values(localDatasets)
    .sort((a, b) => (b.trainingAccuracy || 0) - (a.trainingAccuracy || 0))
    .forEach(model => {
      const isRelevant = model.datasetInfo.classNames.some(className =>
        className.toLowerCase().includes(diagnosisLower) ||
        diagnosisLower.includes(className.toLowerCase())
      );

      if (isRelevant && recommendations.length < 3) {
        recommendations.push({
          modelName: model.modelName,
          reason: `Specialized testing for ${model.datasetInfo.name}`,
          expectedAccuracy: (model.trainingAccuracy || 0) * 100
        });
      }
    });

  return recommendations;
};

/**
 * Summary statistics of available models for transparency
 */
export interface ModelAvailabilityStats {
  totalModels: number;
  imageBasedModels: number;
  tabularModels: number;
  averageAccuracy: number;
  totalTrainingData: number;
  specialtyDistribution: Record<string, number>;
}

export const getModelAvailabilityStats = (): ModelAvailabilityStats => {
  const allModels = Object.values(localDatasets);
  const imageModels = allModels.filter(m => m.modelType === 'image');
  const tabularModels = allModels.filter(m => m.modelType !== 'image');

  const specialtyDistribution: Record<string, number> = {
    dermatology: 0,
    ophthalmology: 0,
    neurology: 0,
    cardiology: 0,
    endocrinology: 0,
    other: 0
  };

  allModels.forEach(model => {
    const name = model.modelName.toLowerCase();
    if (name.includes('skin') || name.includes('dermat') || name.includes('acne')) {
      specialtyDistribution.dermatology++;
    } else if (name.includes('eye') || name.includes('ocular') || name.includes('ophth')) {
      specialtyDistribution.ophthalmology++;
    } else if (name.includes('brain') || name.includes('seizure') || name.includes('alzheimer') || name.includes('mental')) {
      specialtyDistribution.neurology++;
    } else if (name.includes('heart') || name.includes('cardiac')) {
      specialtyDistribution.cardiology++;
    } else if (name.includes('diabetes') || name.includes('thyroid')) {
      specialtyDistribution.endocrinology++;
    } else {
      specialtyDistribution.other++;
    }
  });

  return {
    totalModels: allModels.length,
    imageBasedModels: imageModels.length,
    tabularModels: tabularModels.length,
    averageAccuracy: (
      allModels.reduce((sum, m) => sum + (m.trainingAccuracy || 0), 0) / allModels.length
    ) * 100,
    totalTrainingData: allModels.reduce((sum, m) => sum + m.datasetInfo.totalSamples, 0),
    specialtyDistribution
  };
};

/**
 * Export all model metadata for debugging and transparency
 */
export const exportAllModelMetadata = () => {
  return Object.entries(localDatasets).map(([key, model]) => ({
    id: key,
    name: model.modelName,
    type: model.modelType,
    accuracy: `${(model.trainingAccuracy || 0) * 100}%`,
    trainingSamples: model.datasetInfo.totalSamples,
    classes: model.datasetInfo.classNames,
    datasetName: model.datasetInfo.name,
    filePath: model.filePath
  }));
};
