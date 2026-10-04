import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('robovedanta');
    
    const registrations = await db
      .collection('schoolRegistrations')
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

export async function POST(request) {
  try {
    const body = await request.json();
    
    const requiredFields = ['schoolName', 'contactPerson', 'email', 'phone', 'address', 'city', 'state', 'pincode', 'board'];
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
    
    const registration = {
      ...body,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('schoolRegistrations').insertOne(registration);

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
    const result = await db.collection('schoolRegistrations').deleteOne({
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

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('robovedanta');

    const updateFields = { updatedAt: new Date() };
    if (body.status) updateFields.status = body.status;

    const result = await db.collection('schoolRegistrations').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating registration:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update record' },
      { status: 500 }
    );
  }
}
