import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// GET - Fetch all contact messages
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('robovedanta');
    
    const messages = await db
      .collection('contactMessages')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// POST - Create new contact message
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
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
    
    // Create message document
    const messageDoc = {
      ...body,
      status: 'unread',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('contactMessages').insertOne(messageDoc);

    return NextResponse.json({ 
      success: true, 
      data: { ...messageDoc, _id: result.insertedId }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a message
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Message ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('robovedanta');
    const { ObjectId } = require('mongodb');

    const result = await db.collection('contactMessages').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
