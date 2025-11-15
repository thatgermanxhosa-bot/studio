'use server';

/**
 * @fileOverview An AI agent to analyze quote requests and estimate effort.
 *
 * - analyzeQuoteRequest - Analyzes quote requests to estimate effort.
 * - QuoteRequestInput - The input type for analyzeQuoteRequest.
 * - QuoteRequestOutput - The return type for analyzeQuoteRequest.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuoteRequestInputSchema = z.object({
  projectDetails: z
    .string()
    .describe('Detailed description of the project requirements and goals.'),
  selectedServices: z
    .array(z.string())
    .describe('List of services selected by the client (e.g., videography, photography).'),
  budgetRange: z
    .string()
    .describe('The budget range selected by the client (e.g., <5k, 5k-15k).'),
});
export type QuoteRequestInput = z.infer<typeof QuoteRequestInputSchema>;

const QuoteRequestOutputSchema = z.object({
  estimatedEffort: z
    .string()
    .describe(
      'An estimation of the level of effort required (e.g., Low, Medium, High) based on the project details.'
    ),
  costSummary: z
    .string()
    .describe(
      'A brief summary of the estimated costs involved, broken down by service (e.g., Videography: R10,000, Photography: R5,000).'
    ),
  notesForStudio: z
    .string()
    .describe(
      'Additional notes and considerations for the studio staff when generating the quote, such as potential challenges or areas for upselling.'
    ),
});
export type QuoteRequestOutput = z.infer<typeof QuoteRequestOutputSchema>;

export async function analyzeQuoteRequest(
  input: QuoteRequestInput
): Promise<QuoteRequestOutput> {
  return analyzeQuoteRequestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeQuoteRequestPrompt',
  input: {schema: QuoteRequestInputSchema},
  output: {schema: QuoteRequestOutputSchema},
  prompt: `You are an AI assistant that helps studio managers analyze quote requests from clients.

You will receive the project details, selected services, and budget range from the client. Based on this information, you will estimate the level of effort required, provide a cost summary, and generate notes for the studio staff.

Project Details: {{{projectDetails}}}
Selected Services: {{#each selectedServices}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Budget Range: {{{budgetRange}}}

Consider the project details and selected services to estimate the level of effort required (Low, Medium, or High). Provide a cost summary, breaking down the estimated costs by service. Include any relevant notes or considerations for the studio staff when generating the quote.

Output the information in the following JSON format:

{{json QuoteRequestOutputSchema}}`,
});

const analyzeQuoteRequestFlow = ai.defineFlow(
  {
    name: 'analyzeQuoteRequestFlow',
    inputSchema: QuoteRequestInputSchema,
    outputSchema: QuoteRequestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
