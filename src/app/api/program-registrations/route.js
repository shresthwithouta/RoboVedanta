import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// GET - Fetch all program registrations
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('robovedanta');
    
    const registrations = await db
      .collection('programRegistrations')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: registrations });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}

// POST - Create new program registration
export async function POST(request) {
  // DEBUG
  // return NextResponse.json({ success: true, debug: 'reached' });
  
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['studentName', 'parentName', 'email', 'phone', 'grade', 'programType'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('robovedanta');
    
    // Create registration document
    const registration = {
      ...body,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('programRegistrations').insertOne(registration);

    return NextResponse.json({ 
      success: true, 
      data: { ...registration, _id: result.insertedId }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating registration:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create registration' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a program registration
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Registration ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('robovedanta');
    const { ObjectId } = require('mongodb');

    const result = await db.collection('programRegistrations').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting registration:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete registration' },
      { status: 500 }
    );
  }
}
