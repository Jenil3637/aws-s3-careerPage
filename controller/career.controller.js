// controllers/careerController.js
import Career from '../models/career.model.js';

export const createCareer = async (req, res) => {
  const { title, description } = req.body;
  const resumeUrl = req.file.location;

  if (!title || !description || !resumeUrl) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const newCareer = new Career({
      title,
      description,
      resumeUrl,
    });

    await newCareer.save();

    res.status(201).send(newCareer);
  } catch (error) {
    res.status(500).send({ error: 'Server Error' });
  }
};
