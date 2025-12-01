// app/api/submit-sponsorship/route.js

import { NextResponse } from 'next/server';
import { supabaseServer } from '@/utils/supabase-server'; // Use the secure server client

// Define the POST handler for the API route
export async function POST(request) {
    try {
        // 1. Parse the JSON body from the request
        const formData = await request.json();

        // 2. Simple server-side validation check
        if (!formData.name || !formData.email || !formData.company) {
            return NextResponse.json(
                { message: 'Missing required fields (name, email, company).' },
                { status: 400 } // Bad Request
            );
        }

        // 3. Insert data into Supabase using the secure server client
        const { data, error } = await supabaseServer
            .from('sponsorship_requests')
            .insert([
                {
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    website: formData.website,
                    interest_level: formData.interest_level,
                    message: formData.message,
                },
            ]);

        if (error) {
            console.error('Supabase Error:', error);
            return NextResponse.json(
                { message: 'Database insertion failed.' },
                { status: 500 } // Internal Server Error
            );
        }

        // 4. Success Response
        return NextResponse.json(
            { message: 'Sponsorship request submitted successfully.', data },
            { status: 201 } // Created
        );

    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json(
            { message: 'An unexpected error occurred.' },
            { status: 500 } // Internal Server Error
        );
    }
}