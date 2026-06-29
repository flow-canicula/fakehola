export type FormspreeStatus = 'idle' | 'loading' | 'success' | 'error';

export interface FormspreeError {
  field?: string;
  message: string;
}

export interface FormspreeResponse {
  ok: boolean;
  errors?: FormspreeError[];
}

export async function submitToFormspree(
  formId: string,
  data: Record<string, string>
): Promise<FormspreeResponse> {
  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return { ok: true };
  }

  let errors: FormspreeError[] = [];
  try {
    const json = (await response.json()) as { errors?: FormspreeError[] };
    errors = json.errors ?? [];
  } catch {
    errors = [{ message: 'Something went wrong. Please try again or message us directly on Facebook.' }];
  }

  return { ok: false, errors };
}
