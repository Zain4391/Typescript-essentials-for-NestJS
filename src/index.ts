import {
  BasicsAnnotations,
  calculateTax,
  createBook,
  formatBook,
  getAllExpensiveProducts,
  returnString,
  shoppingList,
} from "./exercises/module1";
import {
  apiConfig,
  createEndpoint,
  createResponse,
  exhaustiveStatusHandler,
  parseApiResponse,
  parseJsonSafely,
  parseUserIds,
  processFilter,
  sampleUser,
  search,
  User,
  validateUser,
} from "./exercises/module2";
import { displayUser } from "./exercises/module3";
import ProductService, { orderService } from "./exercises/module4";

function module1() {
  console.log("Exercises - Module 1 output:\n");
  console.log("===================================");
  BasicsAnnotations();
  const calculatedTax: number = calculateTax(150.5, 0.15);
  console.log("Tax calculated: ", calculatedTax);

  const FireAndBlood = createBook(
    "Fire and Blood",
    "George RR Martin",
    700,
    true
  );
  console.log(FireAndBlood);
  console.log(formatBook(FireAndBlood));
  const expensiveList = getAllExpensiveProducts(shoppingList, 25);
  console.log(expensiveList);

  const val = returnString(33);
  console.log(typeof val);

  const val2 = returnString("33");
  console.log(typeof val2);
  console.log("End of module 1 exercises!");
  console.log("===================================");
}

function module2() {
  console.log("Exercises - Module 2 output:\n");

  const user: User = {
    id: 1,
    name: "Zain Rasool",
    email: "zainrasoolhashmi@gmail.com",
  };

  console.log(createResponse(user));

  const parsedIds = parseUserIds(["6868391", "4455678", "333456"]);
  console.log(parsedIds);

  console.log(apiConfig);

  // three different filters
  processFilter("limit:10");
  processFilter(10);
  processFilter({ field: "limit", value: 3 });

  console.log(sampleUser);

  console.log(createEndpoint("GET", "/all", 200));
  console.log(
    parseApiResponse({
      success: true,
      data: "Response parsed successfully",
    })
  );

  exhaustiveStatusHandler("loading");
  console.log(
    parseJsonSafely(`{"message" : "Error handler made", "status": "200"}`)
  );

  console.log(search(3));
  console.log(search("Hello"));

  console.log(
    validateUser({
      name: "Zain Rasool",
      email: "Zainrasool@gmail.com",
      phone: 3390028074,
      bio: "A sleaky mfer",
      profileImage: "https://www.amazonS3.com/Private_Bucket.jpeg",
    })
  );
}

function module3() {
  console.log(
    displayUser({
      id: 22437,
      username: "Zain_13",
      email: "zainrasoolhashmi@gmail.com",
      isActive: true,
      profilePicture: "https://www.amazon.com/S3/Global_URL",
    })
  );
}

function module4() {
  console.log("Module 4 Exercise Outputs: \n");

  console.log(ProductService.getAllProducts());
  console.log(ProductService.getProductById(3));

  console.log("order Creation simulation...\n");
  console.log(
    orderService.createOrder({
      userId: 3,
      productIds: [3, 4],
    })
  );

  console.log(
    orderService.createOrder({
      userId: -1,
      productIds: [-3, -6],
    })
  );

  console.log(
    orderService.createOrder({
      userId: 1,
      productIds: [3, -4],
    })
  );
}

module4();
