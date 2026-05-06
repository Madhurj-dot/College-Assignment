document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Handle Login Form Submission ---
    const loginForm = document.querySelector('#loginModal form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('exampleInputEmail1').value;
            const password = document.getElementById('exampleInputPassword1').value;
            const rememberMe = document.getElementById('exampleCheck1').checked;

            // Simple validation simulation
            if (email && password) {
                alert(`Welcome back, ${email}! Logging you in...`);
                
                // Close the modal using Bootstrap's instance method
                const modalElement = document.getElementById('loginModal');
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                modalInstance.hide();
                
                // Reset form
                loginForm.reset();
            }
        });
    }

    // --- 2. Handle Search Functionality ---
    const searchForm = document.querySelector('form.d-flex');
    const searchInput = searchForm.querySelector('input[type="search"]');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.toLowerCase().trim();
        const courses = document.querySelectorAll('.course-card');

        if (!query) {
            // If search is empty, show all courses
            courses.forEach(course => course.parentElement.style.display = 'block');
            return;
        }

        courses.forEach(course => {
            const title = course.querySelector('h3').innerText.toLowerCase();
            const description = course.querySelector('p').innerText.toLowerCase();
            
            if (title.includes(query) || description.includes(query)) {
                course.parentElement.style.display = 'block';
            } else {
                course.parentElement.style.display = 'none';
            }
        });
    });

    // --- 3. Dynamic Progress Interaction ---
    // Log a message when a course is clicked
    const courseLinks = document.querySelectorAll('.course-link');
    courseLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const courseName = link.querySelector('h3').innerText;
            const progress = link.querySelector('progress').value;
            console.log(`Navigating to ${courseName}. Current progress: ${progress}%`);
        });
    });

    // --- 4. Deadline Alert Simulation ---
    // Highlight deadlines that are coming up soon (visual feedback)
    const deadlines = document.querySelectorAll('.list-group-item');
    deadlines.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            item.classList.toggle('list-group-item-warning');
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Interactive Curriculum Selection ---
    const curriculumItems = document.querySelectorAll('.list-group-item');

    curriculumItems.forEach(item => {
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', function() {
            // Check if the item is locked
            const isLocked = this.querySelector('.badge').innerText === 'Locked';
            
            if (isLocked) {
                alert("This module is locked. Please complete 'HTML Basic Elements' first!");
            } else {
                // Remove active styling from others
                curriculumItems.forEach(i => i.classList.remove('bg-light', 'border-primary'));
                // Add active styling to this one
                this.classList.add('bg-light', 'border-primary');
                
                const moduleName = this.querySelector('h6').innerText;
                console.log(`Loading content for: ${moduleName}`);
                // In a real app, you would change the iframe 'src' here
            }
        });
    });

    // --- 2. Practice Notes Download Simulation ---
    const downloadBtn = document.querySelector('.btn-warning');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            downloadBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Preparing...';
            downloadBtn.disabled = true;

            // Simulate a delay for generating a PDF/Zip
            setTimeout(() => {
                alert("Your HTML Practice Notes have been downloaded successfully!");
                downloadBtn.innerHTML = 'Download Practice Notes';
                downloadBtn.disabled = false;
            }, 2000);
        });
    }

    // --- 3. Dynamic "Return to Dashboard" Logic ---
    // Your HTML uses window.close(), which only works if the page was opened via JS.
    // This is a safer fallback to redirect back to the index.
    const returnBtn = document.querySelector('.btn-outline-secondary');
    if (returnBtn) {
        returnBtn.onclick = (e) => {
            e.preventDefault();
            if (window.opener) {
                window.close();
            } else {
                window.location.href = 'index.html';
            }
        };
    }

    // --- 4. Scroll-to-Top Header Effect ---
    const header = document.querySelector('.web-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '2rem 0';
            header.style.transition = 'all 0.3s ease';
        } else {
            header.style.padding = '5rem 0';
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Curriculum Access Logic ---
    const curriculumItems = document.querySelectorAll('.list-group-item');

    curriculumItems.forEach(item => {
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', function() {
            const badge = this.querySelector('.badge');
            const status = badge.innerText.trim();
            const moduleName = this.querySelector('h6').innerText;

            if (status === 'Locked') {
                alert(`🔒 The module "${moduleName}" is currently locked. Complete the "Next" lesson to move forward!`);
            } else if (status === 'Done') {
                alert(`✅ You've already completed ${moduleName}. Redirecting to review...`);
                // Logic to seek video to specific timestamp could go here
            } else {
                alert(`🚀 Starting ${moduleName}. Happy Coding!`);
                this.classList.add('border-start', 'border-primary', 'border-4');
            }
        });
    });

    // --- 2. Certificate Download Simulation ---
    const certBtn = document.querySelector('.btn-success');
    
    if (certBtn) {
        certBtn.addEventListener('click', () => {
            // Check if there are any 'Locked' or 'Next' badges left
            const unfinishedItems = Array.from(document.querySelectorAll('.badge'))
                .filter(b => b.innerText !== 'Done');

            if (unfinishedItems.length > 0) {
                const confirmIncomplete = confirm("You haven't finished all modules yet! Download an 'In-Progress' certificate anyway?");
                if (!confirmIncomplete) return;
            }

            // Simulate generation process
            certBtn.innerHTML = '<span class="spinner-grow spinner-grow-sm"></span> Generating PDF...';
            certBtn.disabled = true;

            setTimeout(() => {
                alert("🎓 Congratulations! Your Python Programming Certificate has been generated.");
                certBtn.innerHTML = 'Download Certificate';
                certBtn.disabled = false;
                
                // Trigger a dummy download
                console.log("Certificate downloaded for: Student User");
            }, 2500);
        });
    }

    // --- 3. Dashboard Navigation ---
    const returnBtn = document.querySelector('.btn-outline-secondary');
    if (returnBtn) {
        returnBtn.addEventListener('click', (e) => {
            // If the window was opened via target="_blank", close it; otherwise, redirect.
            if (window.history.length === 1) {
                window.close();
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    // --- 4. Python Tip Console Easter Egg ---
    console.log("%cCodeMaster Academy", "color: #3776ab; font-size: 20px; font-weight: bold;");
    console.log("Tip: Use 'pip install' to expand your Python capabilities!");
});
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Curriculum & Locking Logic ---
    const curriculumItems = document.querySelectorAll('.list-group-item');

    curriculumItems.forEach(item => {
        // Add a pointer cursor to indicate it's interactive
        item.style.cursor = 'pointer';

        item.addEventListener('click', function() {
            const badge = this.querySelector('.badge');
            const status = badge.innerText.trim();
            const lectureTitle = this.querySelector('h6').innerText;

            if (status === 'Locked') {
                alert(`🔒 "${lectureTitle}" is currently locked. Complete the current lecture and quiz to unlock!`);
            } else if (status === 'Current') {
                alert(`📖 You are currently viewing: ${lectureTitle}`);
            }
        });
    });

    // --- 2. Roadmap Download Simulation ---
    const roadmapBtn = document.querySelector('.btn-primary');
    
    if (roadmapBtn) {
        roadmapBtn.addEventListener('click', () => {
            // Visual feedback for the student
            const originalText = roadmapBtn.innerHTML;
            roadmapBtn.disabled = true;
            roadmapBtn.innerHTML = `
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Generating PDF...
            `;

            // Simulate the optimization/generation delay
            setTimeout(() => {
                alert("📂 The DSA Roadmap (Flowcharts to Advanced Structures) has been downloaded. Time to optimize!");
                roadmapBtn.disabled = false;
                roadmapBtn.innerHTML = originalText;
            }, 2000);
        });
    }

    // --- 3. Return to Dashboard (Safety Fallback) ---
    const returnBtn = document.querySelector('.btn-outline-secondary');
    if (returnBtn) {
        returnBtn.addEventListener('click', (e) => {
            // Check if window.close() will actually work (only works for windows opened by scripts)
            if (window.opener || window.history.length === 1) {
                // Let the inline onclick="window.close()" handle it
            } else {
                e.preventDefault();
                window.location.href = 'index.html'; // Fallback to manual navigation
            }
        });
    }

    // --- 4. Problem-Solving Logic Highlight ---
    // Log a small tip in the console for students exploring the code
    console.log("%cDSA Master Tip:", "color: #0d6efd; font-weight: bold; font-size: 14px;");
    console.log("Remember: Space Complexity is as important as Time Complexity!");
});
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Terminal Typing Effect ---
    // Makes the "Quick Terminal" section feel live
    const terminalLines = document.querySelectorAll('.bg-dark code');
    terminalLines.forEach((line, index) => {
        const text = line.innerText;
        line.innerText = '';
        setTimeout(() => {
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    line.innerText += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 50);
        }, index * 1500); // Stagger the start of each line
    });

    // --- 2. Curriculum Interaction ---
    const curriculumItems = document.querySelectorAll('.list-group-item');
    curriculumItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const status = item.querySelector('.badge').innerText;
            const title = item.querySelector('h6').innerText;

            if (status === 'Done') {
                alert(`Revisiting ${title}: Reviewing the 5 Pillars of Security.`);
            } else {
                alert(`Initializing Access to ${title}: Moving to Offensive vs Defensive strategies.`);
            }
        });
    });

    // --- 3. Roadmap Download Logic ---
    const downloadBtn = document.querySelector('.btn-primary');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const originalText = downloadBtn.innerText;
            downloadBtn.disabled = true;
            downloadBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Encrypting Path PDF...';

            // Simulate security clearance/generation delay
            setTimeout(() => {
                alert("The Cyber Security 2025 Roadmap has been successfully downloaded. Objective: Defensive Mastery.");
                downloadBtn.disabled = false;
                downloadBtn.innerText = originalText;
            }, 2000);
        });
    }

    // --- 4. Exit/Navigation Fallback ---
    const exitBtn = document.querySelector('.btn-outline-secondary');
    if (exitBtn) {
        exitBtn.addEventListener('click', (e) => {
            // Safety check for browsers that block window.close()
            if (!window.opener || window.history.length > 1) {
                e.preventDefault();
                window.location.href = 'index.html';
            }
        });
    }

    // --- 5. Console Easter Egg ---
    console.log("%c[SECURITY ALERT]", "color: red; font-weight: bold; font-size: 16px;");
    console.log("Remember the 5 Pillars: Computing, Networking, OS Mastery, and beyond!");
});
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Generative AI Interaction Logic ---
    const curriculumItems = document.querySelectorAll('.list-group-item');

    curriculumItems.forEach(item => {
        // Set cursor to pointer for all curriculum items
        item.style.cursor = 'pointer';

        item.addEventListener('click', function() {
            const badge = this.querySelector('.badge');
            const status = badge ? badge.innerText.trim() : '';
            const moduleTitle = this.querySelector('h6').innerText;

            if (status === 'Locked') {
                alert(`🤖 The module "${moduleTitle}" is currently locked. Complete the Fundamentals to unlock Prompt Engineering and RAG concepts.`);
            } else if (status === 'Current') {
                console.log(`Active Module: ${moduleTitle} - Exploring the GenAI market landscape.`);
            }
        });
    });

    // --- 2. AI Roadmap Download Simulation ---
    const aiRoadmapBtn = document.querySelector('.btn-primary');
    
    if (aiRoadmapBtn) {
        aiRoadmapBtn.addEventListener('click', () => {
            const originalContent = aiRoadmapBtn.innerHTML;
            aiRoadmapBtn.disabled = true;
            
            // Simulating an AI "Generating" process
            aiRoadmapBtn.innerHTML = `
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Synthesizing Roadmap...
            `;

            setTimeout(() => {
                alert("✨ Your Generative AI Roadmap (LLMs, Prompt Engineering, and Vector Databases) has been synthesized and downloaded.");
                aiRoadmapBtn.disabled = false;
                aiRoadmapBtn.innerHTML = originalContent;
            }, 2000);
        });
    }

    // --- 3. Dashboard Navigation Safety ---
    const returnBtn = document.querySelector('.btn-outline-secondary');
    if (returnBtn) {
        returnBtn.addEventListener('click', (e) => {
            // Check if window.close() is likely to be blocked by the browser
            if (!window.opener || window.history.length > 1) {
                e.preventDefault();
                // Redirecting to index.html if close() is restricted
                window.location.href = 'index.html';
            }
        });
    }

    // --- 4. Content Creation Tip ---
    // A small console-based "generative" tip for curious students
    console.log("%cGenAI Insight:", "color: #0dcaf0; font-weight: bold; font-size: 14px;");
    console.log("Difference check: Classifying data = Discriminative AI | Creating data = Generative AI[cite: 3].");
});
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Interactive 70-20-10 Strategy Logic ---
    const strategyAlert = document.querySelector('.alert-warning');
    if (strategyAlert) {
        strategyAlert.style.cursor = 'help';
        strategyAlert.addEventListener('click', () => {
            alert(
                "The 70-20-10 Execution Rule:\n" +
                "• 70% Active Building (Coding Projects)\n" +
                "• 20% Concept Learning (Watching Tutorials)\n" +
                "• 10% Problem Solving (DSA & Logic)\n\n" +
                "Goal: Escape Tutorial Hell through project-based learning."
            );
        });
    }

    // --- 2. 6-Month Plan Progress Highlighting ---
    const planModules = document.querySelectorAll('.border-start.border-primary');
    planModules.forEach((module, index) => {
        module.style.transition = 'all 0.3s ease';
        module.style.cursor = 'pointer';

        module.addEventListener('click', () => {
            // Remove highlighting from others
            planModules.forEach(m => {
                m.classList.remove('shadow-sm');
                m.style.transform = 'translateX(0)';
            });

            // Highlight current selection
            module.classList.add('shadow-sm');
            module.style.transform = 'translateX(10px)';
            
            const monthText = module.querySelector('h5').innerText;
            console.log(`Setting focus to: ${monthText}`);
        });
    });

    // --- 3. AI Edge & Enterprise Path Alerts ---
    const aiEdgeItems = document.querySelectorAll('.list-group-item');
    aiEdgeItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('text-primary', 'fw-bold');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('text-primary', 'fw-bold');
        });
    });

    // --- 4. Roadmap Download Simulation ---
    const downloadBtn = document.querySelector('.btn-primary');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const originalText = downloadBtn.innerHTML;
            downloadBtn.disabled = true;
            downloadBtn.innerHTML = `
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Generating PDF...
            `;

            // Simulate file generation
            setTimeout(() => {
                alert("The Enterprise & AI Full Stack Roadmap has been downloaded. Remember: Focus on Java/Spring Boot for high job volume in banks!");
                downloadBtn.disabled = false;
                downloadBtn.innerHTML = originalText;
            }, 2000);
        });
    }

    // --- 5. Dashboard Navigation Safety ---
    const returnBtn = document.querySelector('.btn-outline-secondary');
    if (returnBtn) {
        returnBtn.addEventListener('click', (e) => {
            if (!window.opener || window.history.length === 1) {
                e.preventDefault();
                window.location.href = 'index.html';
            }
        });
    }

    // --- 6. Interview Prep Easter Egg ---
    console.log("%cFull Stack 2026 Strategy:", "color: #0d6efd; font-weight: bold; font-size: 14px;");
    console.log("Fact: Banks and large-scale companies prefer Enterprise stacks like Java/Spring Boot.");
});
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Dynamic Navbar Styling ---
    const navbar = document.querySelector('.navbar');
    
    // Change navbar appearance when the user scrolls down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-dark', 'shadow');
            navbar.style.padding = '0.5rem 1rem';
        } else {
            navbar.classList.remove('bg-dark', 'shadow');
            navbar.style.padding = '1rem 1rem';
        }
    });

    // --- 2. Smooth Scroll for "Learn More" ---
    const learnMoreBtn = document.querySelector('.btn-outline-light');
    const whySection = document.querySelector('section.container');

    if (learnMoreBtn && whySection) {
        learnMoreBtn.addEventListener('click', () => {
            // Scroll smoothly to the "Why CodeMaster?" section
            whySection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- 3. Feature Card Entrance Animations ---
    const cards = document.querySelectorAll('.course-card');
    
    // Intersection Observer to trigger animations as the user scrolls
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing once the animation has triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        // Initial state for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // --- 4. Hero Section Interactive Effect ---
    const heroTitle = document.querySelector('.home-hero h1');
    if (heroTitle) {
        window.addEventListener('mousemove', (e) => {
            // Subtly shift the hero text based on mouse position for a modern feel[cite: 5]
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            heroTitle.style.textShadow = `${moveX}px ${moveY}px 10px rgba(0,0,0,0.3)`;
        });
    }
});