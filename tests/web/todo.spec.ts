import { test, expect } from '@playwright/test'

test.describe('TodoMVC', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  test('W1 - deve adicionar tarefas e atualizar o contador', async ({ page }) => {
    const newTodoInput = page.getByPlaceholder('What needs to be done?');
    const todoItems = page.locator('.todo-list li');
    const todoCount = page.locator('.todo-count');

    await test.step('Adicionar duas tarefas', async () => {
        await newTodoInput.fill('Estudar Playwright');
        await newTodoInput.press('Enter');

        await newTodoInput.fill('Estudar TypeScript');
        await newTodoInput.press('Enter');
    });

    await test.step('Validar as tarefas adicionadas', async () => {
        await expect(todoItems).toHaveCount(2);

        await expect(todoItems.nth(0)).toContainText('Estudar Playwright');
        await expect(todoItems.nth(1)).toContainText('Estudar TypeScript');
    });

    await test.step('Validar o contador de itens restantes', async () => {
        await expect(todoCount).toContainText('2 items left');
        });
  });

test('W2 - deve concluir uma tarefa e validar os filtros', async ({ page }) => {
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  const todoItems = page.locator('.todo-list li');

  await test.step('Adicionar duas tarefas', async () => {
    await newTodoInput.fill('Tarefa concluída');
    await newTodoInput.press('Enter');

    await newTodoInput.fill('Tarefa ativa');
    await newTodoInput.press('Enter');

    await expect(todoItems).toHaveCount(2);
  });

  await test.step('Concluir uma das tarefas', async () => {
    const completedTask = todoItems.filter({ hasText: 'Tarefa concluída' });

    await completedTask.getByRole('checkbox').check();

    await expect(completedTask).toHaveClass(/completed/);
  });

  await test.step('Validar filtro Completed', async () => {
    await page.getByRole('link', { name: 'Completed' }).click();

    await expect(todoItems).toHaveCount(1);
    await expect(todoItems).toContainText('Tarefa concluída');
  });

  await test.step('Validar filtro Active', async () => {
    await page.getByRole('link', { name: 'Active' }).click();

    await expect(todoItems).toHaveCount(1);
    await expect(todoItems).toContainText('Tarefa ativa');

    await expect(
      page.getByText('Tarefa concluída', { exact: true })
    ).not.toBeVisible();
  });
});

});