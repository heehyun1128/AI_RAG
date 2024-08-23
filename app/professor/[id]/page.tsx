// "use client";
// import Link from 'next/link';

// const ProfessorReview: React.FC = () => {
//   return (
//     <div className="min-h-[80vh] mt-20">
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col md:flex-row justify-between items-start">
//           <div className="mb-8 md:mb-0">
//             <div className="flex items-baseline">
//               <span className="text-8xl md:text-[12rem] font-bold text-primary leading-none">4.3</span>
//               <span className="text-3xl md:text-5xl font-bold text-primary self-start mt-4 md:mt-8 ml-2">/5</span>
//             </div>
//             <p className="text-secondary text-lg font-semibold mt-2">Overall Quality: <span className="text-accent">Above Average</span></p>
//           </div>
//           <div className="mt-4 md:mt-0">
//             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">Robert Rhoads</h2>
//             <p className="text-secondary text-lg md:text-xl font-normal mt-2">Professor in the Education department at UCLA</p>
//           </div>
//         </div>

//         <div className="mt-12 bg-primary p-6 rounded-lg shadow-lg">
//           <h3 className="text-2xl font-bold text-white mb-6">Garry's Summary</h3>
//           <div className="grid md:grid-cols-2 gap-8">
//             <div>
//               <p className="text-white font-bold text-lg mb-4">Pros:</p>
//               <ul className="list-disc pl-6 text-sm text-white space-y-2">
//                 <li>Engaging Lectures: Clear explanations with real-world examples.</li>
//                 <li>Accessible: Quick to respond to emails and offers plenty of office hours.</li>
//                 <li>Fair Grading: Provides detailed feedback and transparent grading criteria.</li>
//                 <li>Passionate: Enthusiastic about the subject, making classes more interesting.</li>
//                 <li>Supportive: Offers additional resources for those struggling with the material.</li>
//               </ul>
//             </div>
//             <div>
//               <p className="text-white font-bold text-lg mb-4">Cons:</p>
//               <ul className="list-disc pl-6 text-sm text-white space-y-2">
//                 <li>Heavy Workload: Assigns a lot of homework and readings, which can be overwhelming.</li>
//                 <li>Strict Deadlines: Late submissions are rarely accepted, no matter the reason.</li>
//                 <li>Fast-Paced: Covers material quickly, which may be challenging for some students.</li>
//                 <li>Limited Class Interaction: Doesn't always encourage student participation during lectures.</li>
//                 <li>Complex Exams: Tests are tough and often include material not covered in depth during lectures.</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       <Link href="/professor" className="text-primary hover:text-secondary mt-4 inline-block">
//           &larr; Back to Professor Search
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProfessorReview;