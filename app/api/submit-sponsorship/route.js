

import { NextResponse } from 'next/server';
import { supabaseServer } from '@/utils/supabase-server'; 


export async function POST(request) {
    try {
        
        const formData = await request.json();

        
        if (!formData.name || !formData.email || !formData.company) {
            return NextResponse.json(
                { message: 'Missing required fields (name, email, company).' },
                { status: 400 } 
            );
        }

        
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
                { status: 500 } 
            );
        }

        
        return NextResponse.json(
            { message: 'Sponsorship request submitted successfully.', data },
            { status: 201 } 
        );

    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json(
            { message: 'An unexpected error occurred.' },
            { status: 500 } 
        );
    }
}