const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Full Stack', 'Frontend', 'Backend', 'React', 'Web Apps'],
      default: 'Full Stack',
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology is required'],
      default: [],
    },
    image: {
      type: String,
      default: '/project-finance.png',
    },
    imagePublicId: {
      type: String,
      default: null,
    },
    liveUrl: {
      type: String,
      trim: true,
      default: '',
    },
    githubUrl: {
      type: String,
      trim: true,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    details: {
      overview: { type: String, default: '' },
      problem: { type: String, default: '' },
      solution: { type: String, default: '' },
      features: { type: [String], default: [] },
      role: { type: String, default: 'Full-Stack Developer' },
      timeline: { type: String, default: '2025 - 2026' },
    },
  },
  {
    timestamps: true,
  }
);

// Slugify pre-validation hook if not set
projectSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema);
