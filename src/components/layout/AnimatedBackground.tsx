
import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions to match viewport
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
    
    // Load background image
    const backgroundImage = new Image();
    backgroundImage.src = "/lovable-uploads/796b2bf1-a44e-4399-8064-677f9a614493.png";
    backgroundImageRef.current = backgroundImage;
    
    // Create particles for animation
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;
      direction: number;
    }> = [];
    
    const particleCount = 50; // Not too many to keep it subtle
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5, // Small particles
        speed: Math.random() * 0.2 + 0.05, // Very slow movement
        opacity: Math.random() * 0.5 + 0.2, // Semi-transparent
        direction: Math.random() * Math.PI * 2 // Random direction
      });
    }
    
    // Animation loop
    let animationFrameId: number;
    
    const render = () => {
      if (!ctx || !backgroundImage.complete) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      // Draw background image
      ctx.globalAlpha = 0.75; // Match the opacity from the original css
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      
      // Add a slight purple tint
      ctx.fillStyle = "rgba(78, 59, 107, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Move particle
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;
        
        // Wrap particles around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.7})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full -z-10 object-cover"
    />
  );
}
