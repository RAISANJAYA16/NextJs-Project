"use client"

function Contactpage() {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const subject = formData.get("subject");
    const body = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      "",
      formData.get("message"),
    ].join("\n");
    const mailto = `mailto:info@company.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }

  return (
<div>
  <div className="bg-base-200 py-8 sm:py-16 lg:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="relative mx-auto mb-12 w-fit sm:mb-16 lg:mb-24">
        <h2 className="text-base-content text-2xl font-bold md:text-3xl lg:text-4xl">Contact Us</h2>
        <span className="from-primary/40 to-primary/5 absolute inset-s-0 top-9 h-1 w-full rounded-full bg-linear-to-r" />
      </div>
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h3 className="mb-2 text-2xl font-semibold text-gray-900">Send us a message</h3>
          <p className="mb-6 text-sm text-gray-600">
            Complete the form and we’ll open a pre-filled email for you to send.
          </p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-gray-900">
                Your name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-gray-900">
                Email address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium text-gray-900">
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-gray-900">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Send Message
            </button>
          </form>
          <p className="mt-5 text-sm text-gray-600">
            Email us directly at{" "}
            <a className="font-medium text-primary underline" href="mailto:info@company.com">
              info@ElctroShop.com
            </a>
          </p>
        </div>


        {/* Contact Info Section */}
        <div>
          {/* Section Title */}
          <h3 className="text-base-content mb-6 text-2xl font-semibold">Happy to help you!</h3>
          <p className="text-base-content/80 mb-10 text-lg font-medium">
           Have a question about a product or order? We’re here to help. Contact us for product details, order updates, delivery questions, or support with a recent purchase. Our team will be happy to assist.

          </p>
          {/* Contact Info Grid */}
          <div className="grid items-stretch gap-6 md:grid-cols-2">
            {/* Office Hours */}
            <div className="card h-full">
              <div className="card-body">
                <div className="avatar avatar-placeholder">
                  <div className="border-primary/20 text-primary w-9 rounded-full border">
                    <span className="icon-[tabler--clock] text-primary size-6" />
                  </div>
                </div>
                <h4 className="text-base-content text-lg font-medium">Office Hours</h4>
                <div className="text-center">
                  <p className="text-base-content/80">Monday-Friday</p>
                  <p className="text-base-content/80">8:00 am to 5:00 pm</p>
                </div>
              </div>
            </div>
            {/* Our Address */}
            <div className="card h-full">
              <div className="card-body">
                <div className="avatar avatar-placeholder">
                  <div className="border-primary/20 text-primary w-9 rounded-full border">
                    <span className="icon-[tabler--map-pin] text-primary size-6" />
                  </div>
                </div>
                <h4 className="text-base-content text-lg font-medium">Our Address</h4>
                <address className="text-base-content/80 text-center not-italic">
                  Tokyo, Kitaku 
                  <br />
                  2-16-3, Japan
                </address>
              </div>
            </div>
            {/* Office 2 */}
            <div className="card h-full">
              <div className="card-body">
                <div className="avatar avatar-placeholder">
                  <div className="border-primary/20 text-primary w-9 rounded-full border">
                    <span className="icon-[tabler--briefcase] text-primary size-6" />
                  </div>
                </div>
                <h4 className="text-base-content text-lg font-medium">Office 2</h4>
                <address className="text-base-content/80 text-center not-italic">
                  Sinjuku Butterfly Building
                  <br />
                  1-24-2, Japan
                </address>
              </div>
            </div>
            {/* Get in Touch */}
            <div className="card h-full">
              <div className="card-body">
                <div className="avatar avatar-placeholder">
                  <div className="border-primary/20 text-primary w-9 rounded-full border">
                    <span className="icon-[tabler--phone] text-primary size-6" />
                  </div>
                </div>
                <h4 className="text-base-content text-lg font-medium">Get in Touch</h4>
                <div className="text-center">
                  <p className="text-base-content/80">+080-688-5685</p>
                  <p className="text-base-content/80">090-477-0169</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</div>
  )
}

export default Contactpage;
