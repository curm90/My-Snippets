import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function main() {
	console.log('Starting seed...');

	// Create a default user for seeding
	const hashedPassword = await bcrypt.hash('password123', 10);

	const user = await prisma.user.upsert({
		where: { email: 'demo@example.com' },
		update: {},
		create: {
			email: 'demo@example.com',
			name: 'Demo User',
			password: hashedPassword,
		},
	});

	console.log('Created user:', user.email);

	// Create some folders
	const webDevFolder = await prisma.folder.upsert({
		where: { id: 'web-dev-folder' },
		update: {},
		create: {
			id: 'web-dev-folder',
			name: 'Web Development',
			userId: user.id,
		},
	});

	const utilsFolder = await prisma.folder.upsert({
		where: { id: 'utils-folder' },
		update: {},
		create: {
			id: 'utils-folder',
			name: 'Utilities',
			userId: user.id,
		},
	});

	console.log('Created folders:', webDevFolder.name, utilsFolder.name);

	// Create some tags
	const jsTag = await prisma.tag.upsert({
		where: { name: 'javascript' },
		update: {},
		create: { name: 'javascript' },
	});

	const reactTag = await prisma.tag.upsert({
		where: { name: 'react' },
		update: {},
		create: { name: 'react' },
	});

	const utilityTag = await prisma.tag.upsert({
		where: { name: 'utility' },
		update: {},
		create: { name: 'utility' },
	});

	console.log('Created tags:', jsTag.name, reactTag.name, utilityTag.name);

	// Create snippets
	const snippets = [
		{
			title: 'Hello World Console Log',
			language: 'javascript',
			content: `console.log("Hello, World!");`,
			userId: user.id,
			folderId: webDevFolder.id,
			snippetTags: {
				connect: [{ id: jsTag.id }],
			},
		},
		{
			title: 'React Component Template',
			language: 'typescript',
			content: `import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Component({ title, children }: Props) {
  return (
    <div className="component">
      <h1>{title}</h1>
      {children}
    </div>
  );
}`,
			userId: user.id,
			folderId: webDevFolder.id,
			snippetTags: {
				connect: [{ id: reactTag.id }, { id: jsTag.id }],
			},
		},
		{
			title: 'Array Utility Functions',
			language: 'javascript',
			content: `// Remove duplicates from array
const removeDuplicates = (arr) => [...new Set(arr)];

// Chunk array into smaller arrays
const chunk = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};

// Find intersection of two arrays
const intersection = (arr1, arr2) => {
  return arr1.filter(value => arr2.includes(value));
};

console.log('Utility functions ready!');`,
			userId: user.id,
			folderId: utilsFolder.id,
			snippetTags: {
				connect: [{ id: jsTag.id }, { id: utilityTag.id }],
			},
		},
		{
			title: 'CSS Flexbox Center',
			language: 'css',
			content: `.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.centered-content {
  /* Your centered content here */
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}`,
			userId: user.id,
			folderId: webDevFolder.id,
		},
		{
			title: 'Node.js Express Server',
			language: 'javascript',
			content: `const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
			userId: user.id,
		},
	];

	for (const snippetData of snippets) {
		const snippet = await prisma.snippet.create({
			data: snippetData,
		});
		console.log('Created snippet:', snippet.title);
	}

	console.log('Seed completed successfully!');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
