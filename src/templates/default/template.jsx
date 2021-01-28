var template = `
<div class=" mx-auto bg-white p-7 m-5">
  <div class="flex row justify-between">
    <div>
      {{{company_name}}} <br/>
      {{{your_name}}} <br/>
      {{{company_gstin}}} <br/>
      {{{address}}} <br/>
      {{{city}}} <br/>
    </div>
    <div>
      {{{company_logo}}}
    </div>
  </div>
  <div class="flex row justify-between mt-10">
    <div class="w-2/4">
      {{{bill_to}}} <br/>
      {{{client_company}}} <br/>
      {{{client_name}}} <br/>
      {{{client_gstin}}} <br/>
      {{{client_address}}} <br/>
      {{{client_city}}} <br/>
    </div>
    <div class="w-2/4">
      <table class="w-full"><tr><td>{{{invoice_number_label}}}</td><td>{{{invoice_number}}}</td></tr><tr><td>{{{invoice_date_label}}}</td><td>{{{invoice_date}}}</td></tr><tr><td>{{{due_date_label}}}</td><td>{{{due_date}}}</td></tr></table>
    </div>
  </div>
  <div class="flex items-start py-2 -mx-1 mt-10 bg-gray-600 text-white">
    <div class="flex-1 px-2">
        Item Description
    </div>
    <div class="w-20 px-1 text-right">
    Quantity
    </div>
    <div class="w-32 px-1 text-right">
    Rate
    </div>
    <div class="w-20 px-2 text-right">
    Amount
    </div>
  </div>
  {{#each repeater}} 
      <div class="flex items-start py-2 -mx-1">
    <div class="flex-1 px-2">
       {{{this.description}}}
    </div>
    <div class="w-20 px-1 text-right">
   {{{this.quantity}}}
    </div>
    <div class="w-32 px-1 text-right">
    {{{this.rate}}}
    </div>
    <div class="w-20 px-2 text-right">
    {{{this.amount}}}
    </div>
  </div>
  {{/each}}
  <div class="mt-10">
  {{{notes_label}}}<br/>
  {{{notes}}}
</div>
  <div class="mt-5">
  {{{terms_label}}}<br/>
  {{{terms}}}
</div>
</div>
`
export default template;