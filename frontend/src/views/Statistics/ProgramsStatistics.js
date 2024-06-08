import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadEntrepreneurs } from '../../app/features/entrepreneursData/entrepreneursSlice';
import { getStyle } from '@coreui/utils';
import {
    CCard,
    CCardBody,
    CCardTitle,
    CButton,
    CCardHeader
} from '@coreui/react';
import { CChart } from '@coreui/react-chartjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaDownload } from "react-icons/fa";

export default function ProgramScreen() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadEntrepreneurs());
    }, [dispatch]);

    const entrepreneurs = useSelector((state) => state.entrepreneurs.entrepreneurs);

    // Calculate number of female and male co-founders
    const numberOfFemaleCoFounders = entrepreneurs.filter(
        (entrepreneur) => entrepreneur.gender === 'femme',
    ).length;
    const numberOfMaleCoFounders = entrepreneurs.length - numberOfFemaleCoFounders;

    // Calculate percentage values
    const totalCoFounders = numberOfFemaleCoFounders + numberOfMaleCoFounders;
    const femalePercentage = (numberOfFemaleCoFounders / totalCoFounders) * 100;
    const malePercentage = (numberOfMaleCoFounders / totalCoFounders) * 100;

    // Render the label with both percentage and number
    const femaleLabel = `Female: ${femalePercentage.toFixed(2)}% (${numberOfFemaleCoFounders})`;
    const maleLabel = `Male: ${malePercentage.toFixed(2)}% (${numberOfMaleCoFounders})`;

    // Calculate number of entrepreneurs per region
    const entrepreneursPerRegion = {};
    entrepreneurs.forEach((entrepreneur) => {
        const region = entrepreneur.region;
        entrepreneursPerRegion[region] = (entrepreneursPerRegion[region] || 0) + 1;
    });

    // Sort regions by number of entrepreneurs
    const sortedRegions = Object.keys(entrepreneursPerRegion).sort(
        (a, b) => entrepreneursPerRegion[b] - entrepreneursPerRegion[a],
    );

    // Convert object to arrays for chart data
    const regionLabels = Object.keys(entrepreneursPerRegion);
    const regionData = Object.values(entrepreneursPerRegion);

    // Function to calculate age from date of birth
    function calculateAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // Calculate total age
    const totalAge = entrepreneurs.reduce(
        (acc, entrepreneur) => acc + calculateAge(entrepreneur.dateDeNaissance),
        0,
    );

    // Calculate average age
    const averageAge = totalAge / entrepreneurs.length;

    // Calculate number of entrepreneurs per sector of activity
    const entrepreneursPerSector = {};
    entrepreneurs.forEach((entrepreneur) => {
        const sector = entrepreneur.secteurActivites;
        entrepreneursPerSector[sector] = (entrepreneursPerSector[sector] || 0) + 1;
    });

    // Sort sectors by number of entrepreneurs
    const sortedSectors = Object.keys(entrepreneursPerSector).sort(
        (a, b) => entrepreneursPerSector[b] - entrepreneursPerSector[a],
    );

    // Convert object to arrays for chart data
    const sectorLabels = Object.keys(entrepreneursPerSector);
    const sectorData = Object.values(entrepreneursPerSector);

    // Create age groups and count entrepreneurs in each group
    const ageGroups = {
        '0-20': 0,
        '21-30': 0,
        '31-40': 0,
        '41-50': 0,
        '51-60': 0,
        '61+': 0,
    };

    entrepreneurs.forEach((entrepreneur) => {
        const age = calculateAge(entrepreneur.dateDeNaissance);
        if (age <= 20) {
            ageGroups['0-20']++;
        } else if (age <= 30) {
            ageGroups['21-30']++;
        } else if (age <= 40) {
            ageGroups['31-40']++;
        } else if (age <= 50) {
            ageGroups['41-50']++;
        } else if (age <= 60) {
            ageGroups['51-60']++;
        } else {
            ageGroups['61+']++;
        }
    });

    const downloadChartAsPdf = (chartId, chartName) => {
        const chartNode = document.getElementById(chartId);
        const chartBounds = chartNode.getBoundingClientRect();
        const chartWidth = chartBounds.width;
        const chartHeight = chartBounds.height;
        
        html2canvas(chartNode, { width: chartWidth, height: chartHeight }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF('landscape', 'px', [chartWidth, chartHeight]);
            pdf.addImage(imgData, 'PNG', 0, 0, chartWidth, chartHeight);
            pdf.save(`${chartName}.pdf`);
        });
    };
    

    // Convert age groups object to arrays for chart data
    const ageLabels = Object.keys(ageGroups);
    const ageData = Object.values(ageGroups);

    const downloadAllChartsAsPdf = () => {
        const charts = document.querySelectorAll('.chart-container');
        const pdf = new jsPDF();
        let yPos = 0;
        charts.forEach((chart, index) => {
            html2canvas(chart).then((canvas) => {
                if (index !== 0) {
                    pdf.addPage();
                    yPos = 0;
                }
                const imgData = canvas.toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', 0, yPos);
                yPos += canvas.height;
                if (index === charts.length - 1) {
                    pdf.save('all_charts.pdf');
                }
            });
        });
    };

   return (
    <div className="container-fluid">
        <div className=" d-flex justify-content-end mt-0 ">
            <CButton color="primary" className="custom-btn mb-4  m-5 mt-0" type="button" value="view all contacts">
                View All Contacts
            </CButton>
            <CButton color="primary" className="custom-btn mb-4" type="button" value="download all charts" onClick={downloadAllChartsAsPdf}>
                Download All Charts as PDF
            </CButton>
        </div>
        <div className="row">
            <div className="col-lg-6 mb-4">
                <CCard>
                    <CCardHeader>
                        <CCardTitle>Entrepreneurs</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                        <section className="position-relative">
                            <h3 className="mb-3 font-weight-bold">Gender Distribution</h3>
                            <div className="chart-container">
                                <CChart
                                    id="genderDistributionEntrepreneurs"
                                    type="pie"
                                    data={{
                                        labels: [femaleLabel, maleLabel],
                                        datasets: [
                                            {
                                                backgroundColor: [
                                                    getStyle('--cui-primary') || '#FF6384', 
                                                    getStyle('--cui-info') || '#36A2EB'
                                                ],
                                                data: [numberOfFemaleCoFounders, numberOfMaleCoFounders],
                                            },
                                        ],
                                    }}
                                />
                            </div>
                            <CButton
                                color="primary"
                                className="mt-3"
                                onClick={() => downloadChartAsPdf('genderDistributionEntrepreneurs', 'GenderDistributionEntrepreneurs')}
                            >
                                <FaDownload />
                            </CButton>
                        </section>
                        <hr />
                        <section className="position-relative">
                            <h3>Regional Distribution</h3>
                            <div className="chart-container">
                                <CChart
                                    id="regionalDistributionEntrepreneurs"
                                    type="bar"
                                    data={{
                                        labels: regionLabels,
                                        datasets: [
                                            {
                                                label: 'Number of Entrepreneurs',
                                                backgroundColor: getStyle('--cui-success') || '#4CAF50',
                                                data: regionData,
                                            },
                                        ],
                                    }}
                                    options={{
                                        scales: {
                                            x: { beginAtZero: true },
                                            y: { beginAtZero: true },
                                        },
                                    }}
                                />
                            </div>
                            <CButton
                                color="primary"
                                className="mt-3"
                                onClick={() => downloadChartAsPdf('regionalDistributionEntrepreneurs', 'RegionalDistributionEntrepreneurs')}
                            >
                                <FaDownload />
                            </CButton>
                        </section>
                        <hr />
                        <section className="position-relative">
                            <h3>Age Distribution</h3>
                            <div className="chart-container">
                                <CChart
                                    id="ageDistributionEntrepreneurs"
                                    type="bar"
                                    data={{
                                        labels: ageLabels,
                                        datasets: [
                                            {
                                                label: 'Number of Entrepreneurs',
                                                backgroundColor: getStyle('--cui-warning') || '#FFC107',
                                                data: ageData,
                                            },
                                        ],
                                    }}
                                    options={{
                                        scales: {
                                            x: { beginAtZero: true },
                                            y: { beginAtZero: true },
                                        },
                                    }}
                                />
                            </div>
                            <CButton
                                color="primary"
                                className="mt-3"
                                onClick={() => downloadChartAsPdf('ageDistributionEntrepreneurs', 'AgeDistributionEntrepreneurs')}
                            >
                                <FaDownload />
                            </CButton>
                        </section>
                    </CCardBody>
                </CCard>
            </div>
            <div className="col-lg-6 mb-4">
                <CCard>
                    <CCardHeader>
                        <CCardTitle>Startups</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                        <section className="position-relative">
                            <h3 className="mb-3 font-weight-bold">Gender Distribution</h3>
                            <div className="chart-container">
                                <CChart
                                    id="genderDistributionStartups"
                                    type="pie"
                                    data={{
                                        labels: ['Female', 'Male'],
                                        datasets: [
                                            {
                                                backgroundColor: [
                                                    getStyle('--cui-primary') || '#FF6384',
                                                    getStyle('--cui-info') || '#36A2EB'
                                                ],
                                                data: [50, 50], // Placeholder data
                                            },
                                        ],
                                    }}
                                />
                            </div>
                            <CButton
                                color="primary"
                                className="mt-3"
                                onClick={() => downloadChartAsPdf('genderDistributionStartups', 'GenderDistributionStartups')}
                            >
                                <FaDownload />
                            </CButton>
                        </section>
                        <hr />
                        <section className="position-relative">
                            <h3>Regional Distribution</h3>
                            <div className="chart-container">
                                <CChart
                                    id="regionalDistributionStartups"
                                    type="bar"
                                    data={{
                                        labels: ['Region 1', 'Region 2', 'Region 3'], // Placeholder data
                                        datasets: [
                                            {
                                                label: 'Number of Startups',
                                                backgroundColor: getStyle('--cui-success') || '#4CAF50',
                                                data: [10, 20, 30], // Placeholder data
                                            },
                                        ],
                                    }}
                                    options={{
                                        scales: {
                                            x: { beginAtZero: true },
                                            y: { beginAtZero: true },
                                        },
                                    }}
                                />
                            </div>
                            <CButton
                                color="primary"
                                className="mt-3"
                                onClick={() => downloadChartAsPdf('regionalDistributionStartups', 'RegionalDistributionStartups')}
                            >
                                <FaDownload />
                            </CButton>
                        </section>
                        <hr />
                        <section className="position-relative">
                            <h3>Age Distribution</h3>
                            <div className="chart-container">
                                <CChart
                                    id="ageDistributionStartups"
                                    type="bar"
                                    data={{
                                        labels: ['0-20', '21-30', '31-40', '41-50', '51-60', '61+'], // Placeholder data
                                        datasets: [
                                            {
                                                label: 'Number of Entrepreneurs',
                                                backgroundColor: getStyle('--cui-warning') || '#FFC107',
                                                data: [5, 15, 10, 5, 3, 2], // Placeholder data
                                            },
                                        ],
                                    }}
                                    options={{
                                        scales: {
                                            x: { beginAtZero: true },
                                            y: { beginAtZero: true },
                                        },
                                    }}
                                />
                            </div>
                            <CButton
                                color="primary"
                                className="mt-3"
                                onClick={() => downloadChartAsPdf('ageDistributionStartups', 'AgeDistributionStartups')}
                            >
                                <FaDownload />
                            </CButton>
                        </section>
                    </CCardBody>
                </CCard>
            </div>
        </div>
    </div>
);
}