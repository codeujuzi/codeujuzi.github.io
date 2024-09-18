
document.addEventListener('DOMContentLoaded', (event) => {
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });

    // Add hover effect to courses
    const courses = document.querySelectorAll('.course');
    courses.forEach(course => {
        course.addEventListener('mouseenter', () => {
            course.style.backgroundColor = '#f0f0f0';
        });
        course.addEventListener('mouseleave', () => {
            course.style.backgroundColor = 'white';
        });
    });

    // Add click event to CTA button
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', () => {
        alert('Welcome to CodeQuest! Get ready to start your coding adventure!');
    });
});