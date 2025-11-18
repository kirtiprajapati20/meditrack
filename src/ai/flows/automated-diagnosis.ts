// AutomatedDiagnosisTool Genkit flow
'use server';
/**
 * @fileOverview An AI-powered tool that suggests potential diagnoses based on symptoms, medical history, and lab results.
 *
 * - automatedDiagnosis - A function that handles the automated diagnosis process.
 * - AutomatedDiagnosisInput - The input type for the automatedDiagnosis function.
 * - AutomatedDiagnosisOutput - The return type for the automatedDiagnosis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomatedDiagnosisInputSchema = z.object({
  symptoms: z.string().describe('The symptoms presented by the patient.'),
  medicalHistory: z.string().describe('The medical history of the patient.'),
  labResults: z.string().describe('The lab results of the patient.'),
});
export type AutomatedDiagnosisInput = z.infer<typeof AutomatedDiagnosisInputSchema>;

const AutomatedDiagnosisOutputSchema = z.object({
  potentialDiagnoses: z.array(z.string()).describe('An array of potential diagnoses suggested by the AI.'),
  confidenceLevels: z.array(z.number()).describe('An array of confidence levels for each potential diagnosis, ranging from 0 to 1.'),
  rationale: z.string().describe('A brief rationale for each suggested diagnosis.'),
});
export type AutomatedDiagnosisOutput = z.infer<typeof AutomatedDiagnosisOutputSchema>;

export async function automatedDiagnosis(input: AutomatedDiagnosisInput): Promise<AutomatedDiagnosisOutput> {
  return automatedDiagnosisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automatedDiagnosisPrompt',
  input: {schema: AutomatedDiagnosisInputSchema},
  output: {schema: AutomatedDiagnosisOutputSchema},
  prompt: `You are an AI-powered diagnostic tool designed to assist doctors in identifying potential diagnoses.
  Based on the provided symptoms, medical history, and lab results, suggest a list of potential diagnoses.
  Provide a confidence level (0 to 1) for each diagnosis and a brief rationale.

  Symptoms: {{{symptoms}}}
  Medical History: {{{medicalHistory}}}
  Lab Results: {{{labResults}}}

  Format your response as a JSON object with the following keys:
  - potentialDiagnoses: An array of potential diagnoses.
  - confidenceLevels: An array of confidence levels (0 to 1) for each diagnosis.
  - rationale: A brief rationale for each suggested diagnosis.
  `,
});

const automatedDiagnosisFlow = ai.defineFlow(
  {
    name: 'automatedDiagnosisFlow',
    inputSchema: AutomatedDiagnosisInputSchema,
    outputSchema: AutomatedDiagnosisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
