'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getAutomatedDiagnosis } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, Terminal } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Get Diagnosis
    </Button>
  );
}

export function DiagnosisForm() {
  const [state, formAction] = useFormState(getAutomatedDiagnosis, null);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Automated Diagnosis Assistant</CardTitle>
          <CardDescription>
            Enter patient information to get AI-suggested potential diagnoses. This tool is for informational purposes only.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="symptoms">Symptoms</Label>
              <Textarea
                id="symptoms"
                name="symptoms"
                placeholder="e.g., persistent cough, fever, headache..."
                required
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Textarea
                id="medicalHistory"
                name="medicalHistory"
                placeholder="e.g., history of asthma, non-smoker..."
                required
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="labResults">Lab Results (Optional)</Label>
              <Textarea
                id="labResults"
                name="labResults"
                placeholder="e.g., CBC: WBC 11.5, Hgb 14.2..."
                rows={4}
              />
            </div>
            {state?.issues && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5">
                    {state.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Diagnosis Results</CardTitle>
          <CardDescription>Potential diagnoses will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          {state?.data ? (
            <div className="w-full space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Potential Diagnoses</h3>
                <div className="space-y-4">
                  {state.data.potentialDiagnoses.map((diag, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium">{diag}</p>
                        <p className="text-sm text-muted-foreground">
                          {Math.round(state.data.confidenceLevels[index] * 100)}% Confidence
                        </p>
                      </div>
                      <Progress value={state.data.confidenceLevels[index] * 100} />
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Rationale</h3>
                <p className="text-sm text-muted-foreground">{state.data.rationale}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              {state?.message && state.message !== 'Success' ? (
                <p className="text-destructive">{state.message}</p>
              ) : (
                <p>Results will be shown here after submission.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
