import { IPrint } from "../interface/general";
import { formattedDate } from "./customDate";

export const handlePrint = ({ orderList, toggleModal }: IPrint) => {
  let totalPrices = 0;

  // Generating HTML for order items
  const orderItemsHTML = orderList
    .map((order) => {
      totalPrices += order.total; // Calculate totalPrices

      return `
            <tr>
                <td>${order.count}X</td>
                <td>${order.id}:</td>
                <td>${order.name}</td>
                <td>${order.total}</td>
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
                            ${orderItemsHTML} <!-- Inject the generated order items HTML -->
                        </tbody>
                    </table>
                </div>

                <!-- Sixth Row - Dash -->
                <div class="divider my-4 border-b border-dashed border-gray-500"></div>

                <!-- Seventh Row - Total -->
                <div class="flex justify-between">
                    <div>Rechnungsbetrag Brutto:</div>
                    <div>Euro ${totalPrices.toFixed(2)}</div>
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
