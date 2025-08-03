function LogMethod(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`🔍 Calling ${propertyName} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`✅ ${propertyName} returned:`, result);
    return result;
  };

  return descriptor;
}

class Calc {
  @LogMethod
  add(a: number, b: number) {
    return a + b;
  }
}

export const calcObj = new Calc();

// ==========================================
// EXERCISE 2: Validation Decorator
// Create a decorator that validates method parameters
// ==========================================

function ValidateInput(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    for (let arg of args) {
      if (typeof arg !== "number" || arg <= 0) {
        throw new Error(
          `All arguments must be positive numbers. Function received: ${arg}`
        );
      }
    }
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class MathOps {
  @ValidateInput
  divide(a: number, b: number) {
    return a / b;
  }

  @ValidateInput
  sqrt(a: number) {
    return Math.sqrt(a);
  }
}

export const mathObj = new MathOps();
