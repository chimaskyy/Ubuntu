/* eslint-disable react/prop-types */
// import { Pencil, Trash2 } from "lucide-react";

// function ProductList({ products, onEdit, onDelete }) {
//   return (
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//       <table className="w-full">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
//               Image
//             </th>
//             <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
//               Name
//             </th>
//             <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
//               Category
//             </th>
//             <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
//               Price
//             </th>
//             <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
//               Stock
//             </th>
//             <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y">
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td className="px-6 py-4">
//                 <div className="flex space-x-2">
//                   {(product.imageUrls || []).map((imageUrl, index) => (
//                     <img
//                       key={index}
//                       src={imageUrl}
//                       alt={product.name}
//                       className="w-16 h-16 object-cover rounded-lg"
//                     />
//                   ))}
//                 </div>
//               </td>
//               <td className="px-6 py-4">{product.name}</td>
//               <td className="px-6 py-4">{product.category}</td>
//               <td className="px-6 py-4">₦{product.price}</td>
//               <td className="px-6 py-4">{product.stock}</td>
//               <td className="px-6 py-4">
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => onEdit(product)}
//                     className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
//                   >
//                     <Pencil className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={() => onDelete(product.id)}
//                     className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ProductList;
/* eslint-disable react/prop-types */
// import { Pencil, Trash2 } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// function ProductList({ products, onEdit, onDelete }) {
//   return (
//     <div className="w-full p-4 space-y-4 bg-background">
//       {/* Table view for larger screens */}
//       <div className="hidden md:block overflow-hidden">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[100px]">Image</TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead className="hidden lg:table-cell">Category</TableHead>
//               <TableHead>Price</TableHead>
//               <TableHead className="hidden lg:table-cell">Stock</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {products.map((product) => (
//               <TableRow key={product.id}>
//                 <TableCell>
//                   {(product.imageUrls || []).map((imageUrl, index) => (
//                     <img
//                       key={index}
//                       src={imageUrl}
//                       alt={product.name}
//                       width={80}
//                       height={80}
//                       className="rounded-md object-cover"
//                     />
//                   ))}
//                 </TableCell>
//                 <TableCell className="font-medium">{product.name}</TableCell>
//                 <TableCell className="hidden lg:table-cell">
//                   {product.category}
//                 </TableCell>
//                 <TableCell>₦{product.price}</TableCell>
//                 <TableCell className="hidden lg:table-cell">
//                   {product.stock}
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => onEdit(product)}
//                   >
//                     <Pencil className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => onDelete(product.id)}
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Card view for mobile screens */}
//       <div className="grid grid-cols-1 gap-4 md:hidden">
//         {products.map((product) => (
//           <Card key={product.id}>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 {product.name}
//               </CardTitle>
//               <Badge>{product.category}</Badge>
//             </CardHeader>
//             <CardContent>
//               <div className="flex justify-between items-center">
//                 <div className="space-y-1">
//                   <p className="text-sm font-medium">₦{product.price}</p>
//                   <p className="text-xs text-muted-foreground">
//                     Stock: {product.stock}
//                   </p>
//                 </div>
//                 {product.imageUrls && product.imageUrls[0] && (
//                   <img
//                     src={product.imageUrls[0]}
//                     alt={product.name}
//                     width={80}
//                     height={80}
//                     className="rounded-md object-cover"
//                   />
//                 )}
//               </div>
//               <div className="flex justify-end space-x-2 mt-4">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => onEdit(product)}
//                 >
//                   <Pencil className="h-4 w-4 mr-2" />
//                   Edit
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => onDelete(product.id)}
//                 >
//                   <Trash2 className="h-4 w-4 mr-2" />
//                   Delete
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductList;

import { Pencil, Trash2 } from "lucide-react";

function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="w-full space-y-4 bg-white">
      {/* Table view for larger screens */}
      <div className="hidden md:block">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <div className="">
              {" "}
              {/* Adjust height as needed */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Images
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Stock
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-400 gap-4">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2 overflow-x-auto pb-2">
                          {product.imageUrls.map((imageUrl, index) => (
                            <img
                              key={index}
                              src={imageUrl}
                              alt={`${product.name} - ${index + 1}`}
                              width={80}
                              height={80}
                              className="rounded-md object-cover flex-shrink-0"
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {product.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ₦{product.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {product.stock}
                        </div>
                      </td>
                      <td className="px-6 py-4 space-x-6 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => onEdit(product)}
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => onDelete(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Card view for mobile screens */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {product.name}
              </h3>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {product.category}
              </span>
            </div>
            <div className="mb-4 overflow-x-auto whitespace-nowrap">
              <div className="flex space-x-2">
                {product.imageUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`${product.name} - ${index + 1}`}
                    width={60}
                    height={60}
                    className="rounded-md object-cover flex-shrink-0"
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-500">
                <p>Price: ₦{product.price.toLocaleString()}</p>
                <p>Stock: {product.stock}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(product)}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;