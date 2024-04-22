import { IPrint } from "../interface/general";
import { formatNumber } from "../shared/constants";
import { formattedDate } from "./customDate";

export const handlePrint = ({ customer, orderList, toggleModal }: IPrint) => {
  let totalPrices = 0;
  let totalDiscounts = 0;
  let totalMW = 0;

  // Generating HTML for order items
  const orderItemsHTML = orderList
    .map((order) => {
      totalPrices += Number(order.total); // Calculate totalPrices
      totalDiscounts += (Number(order.discount) * Number(order.price)) / 100;
      totalMW += (Number(order.price) * 0.7) / 100;

      return `
            <tr>
                <td>${order.count}X</td>
                <td>${order.id}:</td>
                <td>${order.name}</td>
                <td>${formatNumber(Number(order.total))}</td>
                <td>${formatNumber((Number(order.price) * 0.7) / 100)}</td>
            </tr>
           ${
             order.extra.id !== 0
               ? `<tr>
                <td>-</td>
                <td>${order.extra.id}</td>
                <td>${order.extra.name}</td>
                <td>Kein</td>
            </tr>`
               : ""
           }
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
                    margin: 20mm
                }
                
                /* Additional styles for better print layout if needed */
                body {
                    font-family: Arial, sans-serif; /* Example: Change font-family for better readability */
                    font-size: 12pt; 
                }
                
                /* Define other print-specific styles if needed */
                /* For example, hiding certain elements from print */
                .no-print {
                    display: none;
                }
                table {
                    font-size: 12pt; /* Adjust the font size as needed */
                }
                .table {
                    font-size: 12pt; /* Adjust the font size as needed */
                }
            }
        </style>
    </head>
    <body class="bg-white">
        <div class="bill-container mx-auto  rounded-md ">
            <!-- First Row - Logo -->

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
                            <th>Pr</th>
                            <th>%MW</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        ${orderItemsHTML} <!-- Inject the generated order items HTML -->
                    </tbody>
                </table>
            </div>

            <div class="divider my-4 border-b border-dashed border-gray-500"></div>
          
            <div class="flex justify-between">
                <div>Rechnungsbetrag Brutto:</div>
                <div class="font-bold"> € ${(totalDiscounts + totalPrices).toFixed(2)}</div>
            </div>

            <div class="flex justify-between">
                <div>Gesamtrabatt:</div>
                <div class="font-bold">- € ${totalDiscounts.toFixed(2)}</div>
            </div>

            <div class="flex justify-between">
                <div>VAT (MW):</div>
                <div class="font-bold"> € ${totalMW.toFixed(2)}</div>
            </div>

            <div class="flex justify-between">
                <div>Rechnungsbetrag Netto:</div>
                <div class="font-bold">€ ${(totalPrices + totalMW).toFixed(2)}</div>
            </div>

            <div class="flex justify-between mt-4 ">
                <div>Vielen Dank Für Ihre Bestellung</div>
            </div>

            <div class="flex justify-between mt-4 ">
                <div></div>
            </div>
        </div>

        <!-- JavaScript to trigger print directly in the current window -->
        <script>
          window.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
              window.print(); // Trigger the print
            }
            else if (e.key === 'F2') {
                location.reload(); // Reload the page
              }
          });
        </script>
    </body>
    </html>
  `;

  // Write the content to the current document
  document.write(content);
  document.close();

  toggleModal();
};
