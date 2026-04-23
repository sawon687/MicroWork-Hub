export const blogs = [
  {
    id: 1,
    title: "How to Earn More from Micro-tasks in 2024",
    excerpt: "Discover the best strategies to maximize your daily earnings and find high-paying tasks...",
    author: "Admin",
    date: "April 12, 2026",
    category: "Tips & Tricks",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80",
    featured: true
  },
  {
    id: 2,
    title: "The Future of Freelancing",
    excerpt: "How digital platforms are changing the way the world works and earns...",
    author: "Sarah J.",
    date: "April 10, 2026",
    category: "Economy",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80",
  },
  {
    id: 3,
    title: "Security Tips for Online Workers",
    excerpt: "Keep your account safe and avoid common scams in the digital marketplace...",
    author: "Team TaskFlow",
    date: "April 08, 2026",
    category: "Security",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
  },
  {
    id: 4,
    title: "Mastering the Art of Remote Collaboration",
    excerpt: "Effective communication is the backbone of successful remote projects. Learn the tools and habits...",
    author: "Karim Hasan",
    date: "April 15, 2026",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1515378866249-40409787bc31?w=600&q=80",
  },
  {
    id: 5,
    title: "Top 5 Payment Gateways for Freelancers",
    excerpt: "Navigating international payments can be tricky. We compare the fastest and most secure methods...",
    author: "Finance Team",
    date: "April 18, 2026",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  },
  {
    id: 6,
    title: "Avoiding Burnout in the Gig Economy",
    excerpt: "Working from home often blurs the line between rest and labor. Here is how to keep your mental health in check...",
    author: "Dr. Nafisa",
    date: "April 21, 2026",
    category: "Health & Wellness",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
  },
  {
    id: 7,
    title: "The Importance of Profile Verification",
    excerpt: "Verified profiles earn 40% more on average. Learn how to complete your KYC and build trust...",
    author: "Security Dept",
    date: "April 22, 2026",
    category: "Security",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
  },


  // lib/blogData.js (Aro 7-ti extra add kora holo)
{
    id: 8,
    title: "Understanding Micro-task Algorithms",
    excerpt: "Ever wondered how tasks are assigned? Learn how to improve your profile score for better visibility and higher-paying jobs...",
    author: "Tech Insights",
    date: "April 23, 2026",
    category: "Platform Updates",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
},
{
    id: 9,
    title: "The Rise of AI in Micro-tasking",
    excerpt: "Will AI replace micro-workers? Discover how to leverage artificial intelligence to speed up your own workflow and accuracy...",
    author: "Admin",
    date: "April 24, 2026",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
},
{
    id: 10,
    title: "Setting Up a High-Productivity Home Office",
    excerpt: "Your environment affects your earnings. Simple ergonomic tips to stay focused and work longer without feeling tired...",
    author: "Rohan K.",
    date: "April 25, 2026",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80",
},
{
    id: 11,
    title: "Global Trends: Where the Gig Economy is Heading",
    excerpt: "A deep dive into international market shifts and why micro-tasking is becoming a mainstream career choice for students...",
    author: "Sarah J.",
    date: "April 26, 2026",
    category: "Economy",
    image: "https://images.unsplash.com/photo-1454165833767-13a6d44446c1?w=600&q=80",
},
{
    id: 12,
    title: "How to Spot and Avoid Fake Task Offers",
    excerpt: "Scammers are everywhere. Learn the red flags of fraudulent projects and how TaskFlow keeps your account protected...",
    author: "Security Dept",
    date: "April 27, 2026",
    category: "Security",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
},
{
    id: 13,
    title: "Balancing Full-time Jobs with Micro-working",
    excerpt: "Maximize your weekends. A guide for professionals looking to build a secondary income stream through small tasks...",
    author: "Editorial",
    date: "April 28, 2026",
    category: "Success Stories",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
},
{
    id: 14,
    title: "Introduction to TaskFlow API for Developers",
    excerpt: "Are you a developer? Learn how to integrate TaskFlow data into your own tools using our upcoming public API...",
    author: "Dev Team",
    date: "April 29, 2026",
    category: "Platform Updates",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80",
}
];



export const categorysearchReturn=(searchQuery,activeCategory)=>{
     const filteredBlogs = blogs.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery?.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery?.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return filteredBlogs
}