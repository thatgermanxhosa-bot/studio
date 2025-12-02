import { render, screen } from '@testing-library/react';
import ForPersonalWithBackgroundLayout from './layout';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('ForPersonalWithBackgroundLayout', () => {
  it('should render children without a background image or video for a non-specific path', () => {
    (require('next/navigation').usePathname as jest.Mock).mockReturnValue('/');
    render(
      <ForPersonalWithBackgroundLayout>
        <div>Test Child</div>
      </ForPersonalWithBackgroundLayout>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByRole('video')).not.toBeInTheDocument();
  });

  it('should render with the correct background for the contact page', () => {
    (require('next/navigation').usePathname as jest.Mock).mockReturnValue('/for-personal/contact');
    render(
      <ForPersonalWithBackgroundLayout>
        <div>Contact Page Child</div>
      </ForPersonalWithBackgroundLayout>
    );
    expect(screen.getByText('Contact Page Child')).toBeInTheDocument();
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', expect.stringContaining('contact_img.png'));
  });

  it('should render with the correct background for the about page', () => {
    (require('next/navigation').usePathname as jest.Mock).mockReturnValue('/for-personal/about');
    render(
      <ForPersonalWithBackgroundLayout>
        <div>About Page Child</div>
      </ForPersonalWithBackgroundLayout>
    );
    expect(screen.getByText('About Page Child')).toBeInTheDocument();
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', expect.stringContaining('personal_contact_bg.jpg'));
  });

  it('should render with the correct background for the services page', () => {
    (require('next/navigation').usePathname as jest.Mock).mockReturnValue('/for-personal/services');
    render(
      <ForPersonalWithBackgroundLayout>
        <div>Services Page Child</div>
      </ForPersonalWithBackgroundLayout>
    );
    expect(screen.getByText('Services Page Child')).toBeInTheDocument();
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', expect.stringContaining('Bookings_IMG.jpg'));
  });

  it('should render with the video background for the wedding enquiry page', () => {
    (require('next/navigation').usePathname as jest.Mock).mockReturnValue('/for-personal/wedding-enquiry');
    render(
      <ForPersonalWithBackgroundLayout>
        <div>Wedding Enquiry Page Child</div>
      </ForPersonalWithBackgroundLayout>
    );
    expect(screen.getByText('Wedding Enquiry Page Child')).toBeInTheDocument();
    const video = screen.getByRole('video');
    expect(video).toHaveAttribute('src', '/wedding_vid.mp4');
  });
});
