import React, { useState } from 'react';
import {
  CCardBody,
  CCard,
  CCardHeader,
  CCardTitle,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormFeedback,
  CRow,
  CButton,
  CFormCheck,
} from '@coreui/react';
export default function newspaperComposer() {
    const [validated, setValidated] = useState(false);
  const [subject, setSubject] = useState('');
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Index of selected template
  const [recipients, setRecipients] = useState([]);
  const [ccRecipients, setCcRecipients] = useState([]);
  const categories = {
    "Empower Her": "danger",
    "Tech": "success",
    "Entrepreneurship": "warning",
    "Green": "info"
  };
  const [templateContent, setTemplateContent] = useState({
    title1: '',
    firstParagraph: '',
    firstButton: '',
    firstButtonLink: '',
    title2: '',
    SecondParagraph: '',
    title3: '',
    thirdParagraph: '',
    title4: '',
    fourthParagraph: '',
    logo: 'https://via.placeholder.com/290x150',
     image1: 'https://via.placeholder.com/600x300', // Default image URL
     image2: 'https://via.placeholder.com/290x150'
     ,image3: 'https://via.placeholder.com/290x150'
  });
  const Template1 = () => (
    <table
      align="center"
      role="presentation"
      border="0"
      cellSpacing="0"
      cellPadding="0"
      width="100%"
      style={{
        maxWidth: '600px',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <tbody>
        <tr>
          <td style={{ color: '#333', fontSize: '16px', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '20px' }}>
              <img
                src={templateContent.image1}
                alt="Featured Article"
                style={{ maxWidth: '100%', borderRadius: '8px' }}
              />
              <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{templateContent.title1}</h3>
              <p style={{ marginBottom: '10px' }}>{templateContent.firstParagraph}</p>
              <a href={templateContent.firstButtonLink} style={{ color: '#007bff', textDecoration: 'none' }}>
                {templateContent.firstButton}
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td align="center" style={{ padding: '0 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: '1', paddingRight: '10px', textAlign: 'left' }}>
                <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>{templateContent.title2}</h2>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>{templateContent.SecondParagraph}</p>
              </div>
              <div style={{ flex: '1', paddingLeft: '10px', textAlign: 'center' }}>
                <img
                  src={templateContent.image2}
                  alt="Picture 1"
                  style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
              </div>
            </div>
            <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px 0', maxWidth: '80%' }} />
            <tr>
              <td align="center">
                <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>{templateContent.title3}</h2>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>{templateContent.thirdParagraph}</p>
                <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px auto', maxWidth: '80%' }} />
              </td>
            </tr>
            <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px 0', maxWidth: '80%' }} />
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
              Regards,<br />Redstart
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
  const Template2 = () => (
    <table
      align="center"
      role="presentation"
      border="0"
      cellSpacing="0"
      cellPadding="0"
      width="100%"
      style={{
        maxWidth: '600px',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <tbody>
        <tr>
          <td align="center">
            <img
              src={templateContent.logo}
              alt="Logo"
              style={{ maxWidth: '100%', marginBottom: '10px' }}
            />
            <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>Redstart Tunisie</h2>
            <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
              slogen1 bird fathers and life is good
            </p>
            <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px auto', maxWidth: '80%' }} />
          </td>
        </tr>
        <tr>
          <td style={{ color: '#333', fontSize: '16px', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '20px' }}>
              <img
                src={templateContent.image1}
                alt="Featured Article"
                style={{ maxWidth: '100%', borderRadius: '8px' }}
              />
              <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{templateContent.title}</h3>
              <p style={{ marginBottom: '10px' }}>{templateContent.firstParagraph}</p>
              <a href={templateContent.firstButtonLink} style={{ color: '#007bff', textDecoration: 'none' }}>
                {templateContent.firstButton}
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td align="center" style={{ padding: '0 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: '1', paddingRight: '10px', textAlign: 'left' }}>
                <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>{templateContent.title2}</h2>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                  {templateContent.SecondParagraph}
                </p>
              </div>
              <div style={{ flex: '1', paddingLeft: '10px', textAlign: 'center' }}>
                <img
                  src={templateContent.image2}
                  alt="Picture 1"
                  style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <div style={{ flex: '1', paddingRight: '10px', textAlign: 'center' }}>
                <img
                  src={templateContent.image3}
                  alt="Picture 2"
                  style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
              </div>
              <div style={{ flex: '1', paddingLeft: '10px', textAlign: 'left' }}>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                  {templateContent.thirdParagraph}
                </p>
              </div>
            </div>
            <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px 0', maxWidth: '80%' }} />
            <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px 0', maxWidth: '80%' }} />
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
              Regards,<br />Redstart
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
  const templates = [Template1, Template2];
  const handleTemplateSelect = (index) => {
    setSelectedTemplate(index);
    switch (index) {
      case 0: // Template1
        setTemplateContent({
          title1: 'Title 1 for Template 1',
          firstParagraph: 'First Paragraph for Template 1',
          firstButton: 'Button Text 1 for Template 1',
          firstButtonLink: 'https://example.com/link1',
          title2: 'Title 2 for Template 1',
          SecondParagraph: 'Second Paragraph for Template 1',
          title3: 'Title 3 for Template 1',
          thirdParagraph: 'Third Paragraph for Template 1',
          title4: 'Title 4 for Template 1',
          fourthParagraph: 'Fourth Paragraph for Template 1',
           image1: 'https://via.placeholder.com/600x300', // Default image URL
           image2: 'https://via.placeholder.com/290x150'
        });
        break;
      case 1: // Template2
        setTemplateContent({
          title1: 'Title 1 for Template 2',
          firstParagraph: 'First Paragraph for Template 2',
          firstButton: 'Button Text 2 for Template 2',
          firstButtonLink: 'https://example.com/link2',
          title2: 'Title 2 for Template 2',
          SecondParagraph: 'Second Paragraph for Template 2',
          title3: 'Title 3 for Template 2',
          thirdParagraph: 'Third Paragraph for Template 2',
          title4: 'Title 4 for Template 2',
          fourthParagraph: 'Fourth Paragraph for Template 2',
           logo: 'https://via.placeholder.com',
           image1: 'https://via.placeholder.com/600x300', // Default image URL
           image2: 'https://via.placeholder.com/290x150',
           image3: 'https://via.placeholder.com/290x150'
        });
        break;
      case 2: // Template3
        setTemplateContent({
          title1: 'Title 1 for Template 3',
          firstParagraph: 'First Paragraph for Template 3',
          firstButton: 'Button Text 3 for Template 3',
          firstButtonLink: 'https://example.com/link3',
          title2: 'Title 2 for Template 3',
          SecondParagraph: 'Second Paragraph for Template 3',
          title3: 'Title 3 for Template 3',
          thirdParagraph: 'Third Paragraph for Template 3',
          title4: 'Title 4 for Template 3',
          fourthParagraph: 'Fourth Paragraph for Template 3',
          logo: 'https://via.placeholder.com',
           image1: 'https://via.placeholder.com/600x300', // Default image URL
           image2: 'https://via.placeholder.com/290x150',
           image3: 'https://via.placeholder.com/290x150'
        });
        break;
      case 3: // Template4
        setTemplateContent({
          title1: 'Title 1 for Template 4',
          firstParagraph: 'First Paragraph for Template 4',
          firstButton: 'Button Text 4 for Template 4',
          firstButtonLink: 'https://example.com/link4',
          title2: 'Title 2 for Template 4',
          SecondParagraph: 'Second Paragraph for Template 4',
          title3: 'Title 3 for Template 4',
          thirdParagraph: 'Third Paragraph for Template 4',
          title4: 'Title 4 for Template 4',
          fourthParagraph: 'Fourth Paragraph for Template 4',
          logo: 'https://via.placeholder.com',
           image1: 'https://via.placeholder.com/600x300', // Default image URL
           image2: 'https://via.placeholder.com/290x150',
           image3: 'https://via.placeholder.com/290x150'
        });
        break;
      default:
        setTemplateContent({});
        break;
    }
  };
  const handleTemplateContentChange = (key, value) => {
    setTemplateContent((prevContent) => ({
      ...prevContent,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    setValidated(true);
  };

  let SelectedTemplateComponent = null;
  if (selectedTemplate !== null) {
    SelectedTemplateComponent = templates[selectedTemplate];
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <CCardTitle>Email Composition</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="subject">Subject</CFormLabel>
                <CFormInput
                  type="text"
                  id="subject"
                  minLength={8}
                  required
                  placeholder="Enter subject"
                  aria-describedby="subjectFeedback"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <CFormFeedback id="subjectFeedback" invalid>
                  Please enter a valid subject (minimum 8 characters).
                </CFormFeedback>
              </CCol>
            </CRow>
           <CRow>
            <CCol>
                <CFormLabel>CATEGORY</CFormLabel>
                <div style={{ overflowX: 'auto' }}>
                {Object.keys(categories).map((category, index) => (
                      <CFormCheck
                        key={index}
                        type="checkbox"
                        id={`categoryCheckbox${index}`}
                        label={category}
                        className={`text-${categories[category]} mb-2`}
                      />
                    ))}
                </div>
            </CCol>
            <CCol>
            <CFormLabel>Target</CFormLabel>
                        <CFormCheck
                        label="women"
                        type="checkbox"
                        id="women"
                        />
                       <CFormCheck
                        label="Man"
                        type="checkbox"
                        id="man"
                        />
                         <CFormCheck
                        label="entrepreneurs"
                        type="checkbox"
                        id="entrepreneurs"
                      />
            </CCol>
           </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Select Template</CFormLabel>
                <div style={{ maxHeight: '400px', overflowX: 'auto' }}>
                  <CRow className="flex-nowrap">
                    {templates.map((template, index) => (
                      <CCol key={index} xs="6" sm="4" md="3" lg="3" className="m-3 p-0">
                        <div className="border rounded">
                          <CFormCheck
                            type="radio"
                            name="templateRadio"
                            id={`templateRadio${index}`}
                            label={`Template ${index + 1}`}
                            checked={selectedTemplate === index}
                            onChange={() => handleTemplateSelect(index)}
                          />
                          {/* Pass image prop if needed */}
                        </div>
                      </CCol>
                    ))}
                  </CRow>
                </div>
              </CCol>
              
            </CRow>
  </CCardBody>
  </CCard>
  </CCol>
  <CCol>
        <CCard>
          <CCardHeader>
            <CCardTitle>Email Preview</CCardTitle>
          </CCardHeader>
          <CCardBody>
            {selectedTemplate !== null && (
              <SelectedTemplateComponent content={templateContent} />
            )}
          </CCardBody>
        </CCard>
        </CCol>
  </CRow>
  )
}
