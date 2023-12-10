import { IPrint } from "../interface/general";
import { formattedDate } from "./customDate";

export const handlePrint = ({ orderList, toggleModal }: IPrint) => {
    const content = `
        <html>
        <head>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body class="bg-white">
            <div class="bill-container mx-auto  rounded-md ">
                <!-- First Row - Logo -->
                <div class="flex justify-center mb-4">
                    <img src="logo.png" alt="Logo" class="w-32 h-32" />
                </div>

                <!-- Second Row - Data and Bill No -->
                <div class="flex justify-between mb-4">
                    <div>${formattedDate()}</div>
                    <div>Nr: ${12}</div>
                </div>

                <!-- Third Row - Address -->
                <div class="flex flex-col">
                    <div class="flex justify-between mb-1">
                        <div>KNr:xxxxx</div>
                        <div>Tel: 0536789033</div>
                    </div>
                    <div class="flex justify-between mb-1">
                        <div>FeringStrsse 4x</div>
                        <div>Unterfohring</div>
                        <div>85477 Munichen</div>
                    </div>
                </div>

                <!-- Fourth Row - Dash -->
                <div class="divider my-4 border-b border-dashed border-gray-500"></div>

                <!-- Fifth Row - Items List -->
                <div class="items-list">
                    <table class="w-full">
                        <thead>
                            <tr>
                                <th>Anz</th>
                                <th>Nr.</th>
                                <th>Bez.</th>
                                <th>Pr</th>
                                <th>%MW</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            ${orderList.map(order => `
                                <tr>
                                    <td>${order.count}</td>
                                    <td>${order.name}</td>
                                    <td>${order.price}</td>
                                    <td>${order.total}</td>
                                    <td>${order.total}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Sixth Row - Dash -->
                <div class="divider my-4 border-b border-dashed border-gray-500"></div>

                <!-- Seventh Row - Total -->
                <div class="flex justify-between">
                    <div>Rechnungsbetrag Brutto:</div>
                    <div>Euro ${400}</div>
                </div>
                <div class="flex justify-between mt-4 mb-2">
                    <div>Steuer-Nr: 144/126/80559</div>
                </div>

                <div class="flex justify-between mt-4 ">
                    <div>Vielen Dank Für Ihre Bestellung</div>
                </div>

                <div class="flex justify-between mt-4 ">
                <div></div>
            </div>
            </div>
        </body>
        </html>
    `;

    const printWindow = window.open();
    if (printWindow) {
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.print();
    }
    toggleModal()
};