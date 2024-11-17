import express from 'express';
import mongoose from 'mongoose';
import Campaign from '../models/Campaign.js';
import Customer from '../models/Customer.js';

const router = express.Router();

// Get all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create campaign
router.post('/', async (req, res) => {
  try {
    const { name, audience, message, conditions } = req.body;
    
    const campaign = new Campaign({
      name,
      audience,
      message,
      conditions: conditions || [],
      status: 'draft',
      stats: {
        sent: 0,
        delivered: 0,
        failed: 0
      }
    });

    const newCampaign = await campaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(400).json({ message: error.message });
  }
});

// Send campaign messages
router.post('/:id/send', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Get audience based on conditions
    let query = {};
    if (campaign.conditions && campaign.conditions.length > 0) {
      query = campaign.conditions.reduce((acc, condition) => {
        if (condition.field === 'totalSpent') {
          acc[condition.field] = {
            [condition.operator === '>' ? '$gt' : '$lt']: condition.value
          };
        }
        return acc;
      }, {});
    }

    const customers = await Customer.find(query);
    
    // Simulate message sending with 90% success rate
    const results = customers.map(customer => ({
      customerId: customer._id,
      status: Math.random() < 0.9 ? 'SENT' : 'FAILED'
    }));

    // Update campaign stats
    campaign.stats.sent += results.length;
    campaign.stats.delivered += results.filter(r => r.status === 'SENT').length;
    campaign.stats.failed += results.filter(r => r.status === 'FAILED').length;
    campaign.status = 'completed';
    
    await campaign.save({ session });
    await session.commitTransaction();
    
    res.json({ 
      success: true, 
      stats: campaign.stats,
      results 
    });
  } catch (error) {
    await session.abortTransaction();
    console.error('Error sending campaign:', error);
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
});

export default router;