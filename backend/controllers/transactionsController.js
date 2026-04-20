const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAll(req, res) {
  try {
    const { type, status } = req.query;
    const where = {};
    if (type && type !== 'all') where.type = type;
    if (status && status !== 'all') where.status = status;

    const txns = await prisma.transaction.findMany({
      where,
      orderBy: { created_at: 'desc' }
    });
    return res.json({ success: true, data: txns });
  } catch (err) {
    console.error('getAll error:', err);
    return res.status(500).json({ success: false, message: 'Database error, please try again' });
  }
}

async function create(req, res) {
  const { client_name, client_email, amount, type, method, account, status } = req.body;

  if (!client_name || !client_email || !amount || !type || !method || !account) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const txn = await prisma.transaction.create({
      data: { client_name, client_email, amount: parseFloat(amount), type, method, account, status: status || 'pending' }
    });
    return res.json({ success: true, data: txn });
  } catch (err) {
    console.error('create error:', err);
    return res.status(500).json({ success: false, message: 'Database error, please try again' });
  }
}

async function update(req, res) {
  const id = parseInt(req.params.id);
  const { client_name, client_email, amount, type, method, account, status } = req.body;

  try {
    const existing = await prisma.transaction.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    const txn = await prisma.transaction.update({
      where: { id },
      data: {
        ...(client_name && { client_name }),
        ...(client_email && { client_email }),
        ...(amount && { amount: parseFloat(amount) }),
        ...(type && { type }),
        ...(method && { method }),
        ...(account && { account }),
        ...(status && { status })
      }
    });
    return res.json({ success: true, data: txn });
  } catch (err) {
    console.error('update error:', err);
    return res.status(500).json({ success: false, message: 'Database error, please try again' });
  }
}

async function remove(req, res) {
  const id = parseInt(req.params.id);
  try {
    const existing = await prisma.transaction.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    await prisma.transaction.delete({ where: { id } });
    return res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    console.error('delete error:', err);
    return res.status(500).json({ success: false, message: 'Database error, please try again' });
  }
}

module.exports = { getAll, create, update, remove };
