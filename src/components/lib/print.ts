import { IPrint } from "../interface/general";
import { formatNumber } from "../shared/constants";
import { formattedDate } from "./customDate";

export const handlePrint = ({ customer, orderList, toggleModal }: IPrint) => {
  let totalPrices = 0;

  // Generating HTML for order items
  const orderItemsHTML = orderList
    .map((order) => {
      totalPrices += Number(order.total); // Calculate totalPrices

      return `
            <tr>
                <td>${order.count}X</td>
                <td>${order.id}:</td>
                <td>${order.name}</td>
                <td>€${formatNumber(Number(order.extra))}</td>
                <td>${formatNumber(Number(order.total))}</td>
                <td>-</td>
            </tr>
        `;
    })
    .join("");

  // HTML content to be printed
  const content = `
    <html>
    <head>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
            @media print {
                @page {
                    size: A5; /* Set the page size to A5 */
                }
                
                /* Additional styles for better print layout if needed */
                body {
                    font-family: Arial, sans-serif; /* Example: Change font-family for better readability */
                }
                
                /* Define other print-specific styles if needed */
                /* For example, hiding certain elements from print */
                .no-print {
                    display: none;
                }
            }
        </style>
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
                <div>Nr: ${orderList[0].id}</div>
            </div>

            <div class="flex flex-col">
                <div class="flex justify-between mb-1">
                    <div>KNr: ${customer.KNr}</div>
                    <div>Tel: ${customer.Tel}</div>
                </div>
                <div class="flex justify-between mb-1">
                    <div>${customer.Str}</div>
                    <div>${customer.Seit}</div>
                    <div>${customer.Ort}</div>
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
                            <th>Extra</th>
                            <th>Pr</th>
                            <th>%MW</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        ${orderItemsHTML} <!-- Inject the generated order items HTML -->
                    </tbody>
                </table>
            </div>

            <!-- Sixth Row - Dash -->
            <div class="divider my-4 border-b border-dashed border-gray-500"></div>

            <!-- Seventh Row - Total -->
            <div class="flex justify-between">
                <div>Rechnungsbetrag Brutto:</div>
                <div class="font-bold">€ ${totalPrices.toFixed(2)}</div>
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

  // Open a new window to print the content
  const printWindow = window.open();
  if (printWindow) {
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  }

  toggleModal();
};
