import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { insertRecipeSchema, type InsertRecipe, type Recipe } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EditRecipe({ params }: { params?: { id: string } }) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isEditing = Boolean(params?.id);

  const { data: recipe } = useQuery<Recipe>({
    queryKey: isEditing ? ["/api/recipes", params!.id] : [],
    enabled: isEditing,
  });

  const form = useForm<InsertRecipe>({
    resolver: zodResolver(insertRecipeSchema),
    defaultValues: recipe || {
      title: "",
      content: "",
      servings: 1,
      ingredients: [""],
      instructions: [""],
      imageUrl: "",
    },
  });

  const onSubmit = async (data: InsertRecipe) => {
    try {
      if (isEditing) {
        await apiRequest("PATCH", `/api/recipes/${params!.id}`, data);
      } else {
        await apiRequest("POST", "/api/recipes", data);
      }
      queryClient.invalidateQueries({ queryKey: ["/api/recipes"] });
      toast({ title: `Recipe ${isEditing ? "updated" : "created"}` });
      setLocation("/");
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} recipe`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="outline">Back to Recipes</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">
              {isEditing ? "Edit Recipe" : "New Recipe"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="servings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Servings</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Ingredients</FormLabel>
                  {form.watch("ingredients").map((_, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <FormField
                        control={form.control}
                        name={`ingredients.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const ingredients = form.getValues("ingredients");
                          form.setValue(
                            "ingredients",
                            ingredients.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      const ingredients = form.getValues("ingredients");
                      form.setValue("ingredients", [...ingredients, ""]);
                    }}
                  >
                    Add Ingredient
                  </Button>
                </div>

                <div>
                  <FormLabel>Instructions</FormLabel>
                  {form.watch("instructions").map((_, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <FormField
                        control={form.control}
                        name={`instructions.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const instructions = form.getValues("instructions");
                          form.setValue(
                            "instructions",
                            instructions.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      const instructions = form.getValues("instructions");
                      form.setValue("instructions", [...instructions, ""]);
                    }}
                  >
                    Add Instruction
                  </Button>
                </div>

                <div className="flex justify-end gap-2">
                  <Link href="/">
                    <Button variant="outline">Cancel</Button>
                  </Link>
                  <Button type="submit">
                    {isEditing ? "Update Recipe" : "Create Recipe"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
