'use server';

import { automatedDiagnosis, AutomatedDiagnosisInput } from '@/ai/flows/automated-diagnosis';
import { z } from 'zod';

const DiagnosisSchema = z.object({
  symptoms: z.string().min(10, { message: 'Please describe symptoms in at least 10 characters.' }),
  medicalHistory: z.string().min(10, { message: 'Please provide medical history of at least 10 characters.' }),
  labResults: z.string(),
});

export type DiagnosisFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  data?: Awaited<ReturnType<typeof automatedDiagnosis>>;
} | null;

export async function getAutomatedDiagnosis(
  prevState: DiagnosisFormState,
  formData: FormData,
): Promise<DiagnosisFormState> {
  const validatedFields = DiagnosisSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    const { errors } = validatedFields.error;
    return {
      message: "Validation failed.",
      issues: errors.map((issue) => issue.message),
    };
  }

  try {
    const result = await automatedDiagnosis(validatedFields.data as AutomatedDiagnosisInput);
    if (!result.potentialDiagnoses || result.potentialDiagnoses.length === 0) {
      return { message: "The AI could not determine a potential diagnosis based on the provided information. Please provide more details." };
    }
    return { message: "Success", data: result };
  } catch (error) {
    console.error(error);
    return { message: "An unexpected error occurred while processing the diagnosis. Please try again." };
  }
}
