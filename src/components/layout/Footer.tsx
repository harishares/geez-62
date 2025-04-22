
export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border py-6 bg-background/80 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">GEN Z CLG</h3>
            <p className="text-sm text-muted-foreground">
              The ultimate platform for college students to connect, learn, and grow together.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="text-sm hover:text-primary transition-colors">Dashboard</a></li>
              <li><a href="/learning" className="text-sm hover:text-primary transition-colors">Learning</a></li>
              <li><a href="/events" className="text-sm hover:text-primary transition-colors">Events</a></li>
              <li><a href="/networking" className="text-sm hover:text-primary transition-colors">Networking</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <address className="not-italic text-sm text-muted-foreground">
              <p>Email: contact@genzcollege.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-primary transition-colors">Facebook</a>
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} GEN Z CLG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
